"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

// configuração do dayjs para usar o plugin utc
dayjs.extend(utc);

// action para criar ou atualizar um profissional
export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime; // 15:30:00
    const availableToTime = parsedInput.availableToTime; // 16:00:00

    // converte os horários para o horário UTC
    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0])) // parseint para converter a string em um número
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();

    // converte o horário de término para o horário UTC
    const availableToTimeUTC = dayjs() // dayjs para converter a string em um objeto de data
      .set("hour", parseInt(availableToTime.split(":")[0])) // parseint para converter a string em um número
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

    // verifica se o usuário está autenticado
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    // insere o profissional no banco de dados
    await db
      .insert(doctorsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: session?.user.clinic?.id,
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      })

      // se o profissional existir, atualiza o profissional
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          ...parsedInput,
          availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
          availableToTime: availableToTimeUTC.format("HH:mm:ss"),
        },
      });

    // atualiza o cache para refletir as alterações
    revalidatePath("/doctors");
  });

// server actions servem para criar e atualizar dados no banco de dados
// elas são executadas no lado do servidor
// elas podem ser async
// elas podem usar o db
// elas podem usar o auth
// elas podem usar o headers
