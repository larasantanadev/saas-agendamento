import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// customSession é um plugin que permite adicionar informações personalizadas à sessão do usuário
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { usersToClinicsTable } from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),

  //configuração dos provedores de autenticação social
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  //configuração do plugin customSession que adiciona informações personalizadas à sessão do usuário
  plugins: [
    customSession(async ({ user, session }) => {
      //pega as clínicas do usuário
      const clinics = await db.query.usersToClinicsTable.findMany({
        where: eq(usersToClinicsTable.userId, user.id),
        with: {
          clinic: true,
        },
      });

      // TODO: Ao adaptar para o usuário ter múltiplas clínicas, deve-se mudar esse código
      //pega a primeira clínica do usuário
      const clinic = clinics?.[0];
      return {
        user: {
          ...user,
          clinic: clinic?.clinicId
            ? {
                id: clinic?.clinicId, //pega o id da clínica do usuário
                name: clinic?.clinic?.name, //pega o nome da clínica do usuário
              }
            : undefined,
        },
        session,
      };
    }),
  ],

  //configuração dos modelos de usuário, sessão, conta e verificação para o banco de dados
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
