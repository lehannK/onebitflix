// arquivo para configurar o express

import express from "express";
import cors from "cors";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from "./routes";

const app = express();

// cors é um middleware que permite que nosso backend se comunique com diferentes origens de domínio
// necessário para impedir erros quando nosso backend se conectar com o frontend
// temos diversas configurações disponíveis nele, por exemplo: definir especificamente quais serão os domínios aceitos e quais são as permissões http que esses domínios terão (GET E PUT, por exemplo)
app.use(cors());

// método para indicar ao express o diretório 'public', onde serão servidos os arquivos estáticos da página
app.use(express.static("public"));

// middleware que permite o express tratar conteúdos json
app.use(express.json());

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // esse método executa uma query qualquer dentro do nosso DB e retorna essa query no console. Usamos para validar se a comunicação com o banco está ok
  sequelize.authenticate().then(() => {
    console.log("DB connection successfull");
  });

  console.log(`Server started successfuly at port ${PORT}`);
});
