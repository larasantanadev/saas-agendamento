import { createSafeActionClient } from "next-safe-action";

// cria o client para as actions
export const actionClient = createSafeActionClient();

// actions são funções que podem ser executadas no lado do servidor
