import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./_components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    //pega a sessão do usuário
    headers: await headers(), //pega os headers da requisição
  });

  if (!session?.user) {
    //se o usuário não estiver autenticado, redireciona para a página de login
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    //se o usuário não tiver clinicas, redireciona para a página de cadastro de clínica
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;

// SERVER COMPONENT
// pode ser async
// pode usar db
// pode usar auth
// pode usar headers
// pode usar redirect
// pode usar cookies
// pode usar session

// CLIENT COMPONENT
// nao pode ser async
// pode usar hooks
// pode usar useEffect
// pode usar useState
// pode usar useContext
// pode usar useRef
// pode usar useCallback
