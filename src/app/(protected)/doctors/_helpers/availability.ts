import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { doctorsTable } from "@/db/schema";

// configura o dayjs para o horário UTC e o idioma português do Brasil
dayjs.extend(utc);
dayjs.locale("pt-br");

// função para obter a disponibilidade do profissional
export const getAvailability = (doctor: typeof doctorsTable.$inferSelect) => {
  // configura o horário de início
  const from = dayjs()
    .utc()
    .day(doctor.availableFromWeekDay)
    .set("hour", Number(doctor.availableFromTime.split(":")[0])) // seta o horário de início
    .set("minute", Number(doctor.availableFromTime.split(":")[1])) // seta o minuto de início
    .set("second", Number(doctor.availableFromTime.split(":")[2] || 0)) // seta o segundo de início
    .local();

  // configura o horário de término
  const to = dayjs()
    .utc()
    .day(doctor.availableToWeekDay)
    .set("hour", Number(doctor.availableToTime.split(":")[0])) // seta o horário de término
    .set("minute", Number(doctor.availableToTime.split(":")[1])) // seta o minuto de término
    .set("second", Number(doctor.availableToTime.split(":")[2] || 0)) // seta o segundo de término
    .local();
  return { from, to };
};
