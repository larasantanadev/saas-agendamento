import { customSessionClient } from "better-auth/client/plugins"; //plugin que adiciona informações personalizadas à sessão do usuário
import { createAuthClient } from "better-auth/react"; //plugin que cria o cliente de autenticação

import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
  //configuração do plugin customSessionClient que adiciona informações personalizadas à sessão do usuário
});
