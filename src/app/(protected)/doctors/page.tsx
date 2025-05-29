import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-button";
import DoctorCard from "./_components/doctor-card";

// pagina de gerenciamento de médicos
const DoctorsPage = async () => {
  //pega o usuário logado
  const session = await auth.api.getSession({
    headers: await headers(), //pega o header da requisição
  });

  //se o usuário não está logado, redireciona para a página de login, melhorar isso no futuro
  // para nao repetir o codigo
  if (!session?.user) {
    redirect("/authentication");
  }

  //se a clínica do usuário não está cadastrada, redireciona para o formulário de cadastro
  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  //pega todos os médicos da clínica do usuário
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Profissionais da Saúde</PageTitle>
          <PageDescription>
            Gerencie os profissionais da saúde da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddDoctorButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="grid grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
