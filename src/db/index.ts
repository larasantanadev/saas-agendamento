import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema"; //importa o schema para o drizzle

export const db = drizzle(process.env.DATABASE_URL!, {
  //cria o db com o schema
  schema,
});
