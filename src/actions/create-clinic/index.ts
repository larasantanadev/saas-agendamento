"use server"; // indica que a função é uma action do Next.js

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createClinic = async (name: string) => {
  // verifica se o usuário está autenticado
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // insere a clínica no banco de dados
  const [clinic] = await db.insert(clinicsTable).values({ name }).returning(); // retorna o id da clínica

  // insere o usuário na tabela de usuários e clínicas
  await db.insert(usersToClinicsTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });

  // redireciona para a página de dashboard
  redirect("/dashboard");
};

// actions são funções que podem ser executadas no lado do servidor
// podem ser async
// podem usar db
// podem usar auth
// podem usar headers
// podem usar redirect

// essa action é usada no clinic-form/components/form.tsx
// ela é usada para criar uma nova clínica
// ela é chamada quando o usuário clica no botão de criar clínica
