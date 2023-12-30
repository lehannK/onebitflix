import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // define o caminho /admin como a url de administrador
  resources: adminJsResources,
  branding: brandingOptions, // arquivo de estilização geral (fontes, cores etc)
  locale: locale, // arquivo de tradução para pt-br
  dashboard: dashboardOptions, // arquivo de customização do dashboard
  assets: {
    styles: ["/index.css"], //css do adminjs, que por padrão deve estar na pasta public
  },
});

// variável de construção de rotas autenticadas
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions, // arquivo que realiza a autenticação e encriptamento
  null,
  {
    resave: false,
    saveUninitialized: false,
  }
);
