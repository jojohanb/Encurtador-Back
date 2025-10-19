import db from "./src/infra/connection.js";
import { urls } from "./src/infra/db/schema.js"; 

async function testConnection() {
  try {
    const result = await db.select().from(urls).limit(1);
    console.log("Conexão com Drizzle funcionando!");
    console.log(result);
  } catch (error) {
    console.error("Erro ao testar Drizzle:", error);
  }
}

testConnection();
