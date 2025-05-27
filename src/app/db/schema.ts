import {
  uuid,
  pgTable,
  text,
  timestamp,
  integer,
  time,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ------------------------------------------------------------------------------------------------ TABELA USUARIOS
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToClinics: many(usersToClinicsTable), // um usuario pode ter varias clinicas
}));

// ------------------------------------------------------------------------------------------------ TABELA CLINICAS
export const clinicsTable = pgTable("clinics", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// ------------------------------------------------------------------------------------------------ TABELA USUARIOS PARA CLINICAS
export const usersToClinicsTable = pgTable("users_to_clinics", {
  userId: uuid("user_id") // usuario pode ter varias clinicas
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  clinicId: uuid("clinic_id") // clinica pode ter varios usuarios
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToClinicsTableRelations = relations(
  usersToClinicsTable, // relacionamento entre usuarios e clinicas
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId], // usersToClinicsTable.userId é o campo que referencia um usuario
      references: [usersTable.id], // usersTable.id é o campo que referencia um usuario
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId], // usersToClinicsTable.clinicId é o campo que referencia uma clinica
      references: [clinicsTable.id], // clinicsTable.id é o campo que referencia uma clinica
    }),
  }),
);

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
  // relacionamento entre clinicas e outras tabelas
  doctors: many(doctorsTable), // a clinica pode ter muitos medicos
  patients: many(patientsTable), // a clinica pode ter muitos pacientes
  appointments: many(appointmentsTable), // a clinica pode ter muitos agendamentos
  usersToClinics: many(usersToClinicsTable), // a clinica pode ter muitos usuarios
}));

// ------------------------------------------------------------------------------------------------ TABELA MEDICOS
export const doctorsTable = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: "cascade",
    }), // deletou clinica x = medico dessa clinica é deletado automaticamente também

  name: text("name").notNull(),
  avatarImageUrl: text("avatar_image_url"),

  // 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday, 0 - Sunday
  availableFromWeekDay: integer("available_from_week_day").notNull(), // 1
  availableToWeekDay: integer("available_to_week_day").notNull(), // 5
  availableFromTime: time("available_from_time").notNull(), // 09:00
  speciality: text("speciality").notNull(),
  appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
  // relacionamento entre medicos e outras tabelas
  clinic: one(clinicsTable, {
    // um medico pertence a uma clinica
    fields: [doctorsTable.clinicId], //doctorsTable.clinicId é o campo que referencia a clinica
    references: [clinicsTable.id], //clinicsTable.id é o campo que referencia a clinica
  }),
}));

// Enum para o sexo do paciente
export const patientSexEnum = pgEnum("patient_sex", ["male", "female"]);

// ----------------------------------------------------------------------------------------------- TABELA PACIENTES
export const patientsTable = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: "cascade",
    }), // deletou clinica x = paciente dessa clinica é deletado automaticamente também

  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  sex: patientSexEnum("sex").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const patientsTableRelations = relations(patientsTable, ({ one }) => ({
  clinic: one(clinicsTable, {
    // um paciente pertence a uma clinica
    fields: [patientsTable.clinicId], //patientsTable.clinicId é o campo que referencia a clinica
    references: [clinicsTable.id], //clinicsTable.id é o campo que referencia a clinica
  }),
}));

// ------------------------------------------------------------------------------------------- TABELA AGENDAMENTOS
export const appointmentsTable = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  clinicId: uuid("clinic_id")
    .notNull()
    .references(() => clinicsTable.id, {
      onDelete: "cascade",
    }), // deletou clinica x = agendamento dessa clinica é deletado automaticamente também

  patientId: uuid("patient_id")
    .notNull()
    .references(() => patientsTable.id, {
      onDelete: "cascade",
    }), // deletou paciente x = agendamento desse paciente é deletado automaticamente também

  doctorId: uuid("doctor_id")
    .notNull()
    .references(() => doctorsTable.id, {
      onDelete: "cascade",
    }), // deletou medico x = agendamento desse medico é deletado automaticamente também

  appointmentTime: timestamp("appointment_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const appointmentsTableRelations = relations(
  appointmentsTable,
  ({ one }) => ({
    clinic: one(clinicsTable, {
      // um agendamento pertence a uma clinica
      fields: [appointmentsTable.clinicId], //appointmentsTable.clinicId é o campo que referencia a clinica
      references: [clinicsTable.id], //clinicsTable.id é o campo que referencia a clinica
    }),
    patient: one(patientsTable, {
      // um agendamento pertence a um paciente
      fields: [appointmentsTable.patientId], //appointmentsTable.patientId é o campo que referencia o paciente
      references: [patientsTable.id], //patientsTable.id é o campo que referencia o paciente
    }),
    doctor: one(doctorsTable, {
      // um agendamento pertence a um medico
      fields: [appointmentsTable.doctorId], //appointmentsTable.doctorId é o campo que referencia o medico
      references: [doctorsTable.id], //doctorsTable.id é o campo que referencia o medico
    }),
  }),
);
