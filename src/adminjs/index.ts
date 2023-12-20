import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Course, Episode, User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // define o caminho /admin como a url de administrador
  resources: adminJsResources,
  branding: {
    // esse objeto modifica os estilos default do adminJS
    companyName: "OneBitFlix",
    logo: "/onebitflix.svg",
    theme: {
      colors: {
        primary100: "#ff0043",
        primary80: "#ff1a57",
        primary60: "#ff3369",
        primary40: "#ff4d7c",
        primary20: "#ff668f",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#151515",
      },
    },
  },
  locale: locale, // arquivo de tradução para pt-br
  dashboard: {
    // aqui, definimos os componentes e handlers react para customizar nosso dashboard
    component: AdminJS.bundle("./components/Dashboard"), //apontamos que o jsx/tsx está nesse diretório
    handler: async (req, res, context) => {
      // esse handler serve para contar todos os registros da nossa db
      const courses = await Course.count();
      const episodes = await Episode.count();
      const categories = await Category.count();
      const standardUsers = await User.count({ where: { role: "user" } });

      // retornamos esses registros no formato json
      res.json({
        Cursos: courses,
        Episódios: episodes,
        Categorias: categories,
        Usuários: standardUsers,
      });
    },
  },
});

// variável de construção de rotas autenticadas
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    // verifica se o email passado no input existe na tabela,
    // se sim, compara a senha passada com a senha do banco
    // matched retorna um boolean, que se for true, autentica o acesso
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });

      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);

        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: "senha-do-cookie",
  },
  // os parâmetros abaixo são para evitar os avisos de versão depreciada dos módulos
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
