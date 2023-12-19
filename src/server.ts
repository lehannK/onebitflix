// src/server.ts
// arquivo para testar o express

import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";

const app = express();

// método para indicar ao express o diretório 'public', onde serão servidos os arquivos estáticos da página
app.use(express.static("public"));

app.use(adminJs.options.rootPath, adminJsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // esse método executa uma query qualquer dentro do nosso DB e retorna essa query no console. Usamos para validar se a comunicação com o banco está ok
  sequelize.authenticate().then(() => {
    console.log("DB connection successfull");
  });

  console.log(`Server started successfuly at port ${PORT}`);
});
