import db from "./src/infra/connection.js";
import { users } from "./src/infra/db/schema.js"; 

async function testConnection() {
  try {
    // Apenas para ver se o banco responde
    const result = await db.select().from(users).limit(1);
    console.log("Conexão com Drizzle funcionando!");
    console.log(result);
  } catch (error) {
    console.error(" Erro ao testar Drizzle:", error);
  }
}

testConnection();