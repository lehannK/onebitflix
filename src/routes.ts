/// config de rotas

import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { authController } from "./controllers/authController";
import { ensureAuth } from "./middlewares/auth";
import { coursesController } from "./controllers/coursesController";

const router = express.Router();

// rota de registro e login de usuário
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// no caminho /categories rodaremos a função de callback 'index' que foi definida no categoriesController
// podemos definir o ensureAuth como um middleware para todas as rotas que quisermos exigir autenticação
// no exemplo abaixo, a rota só executará o controlador se o middleware permitir
router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/:id", coursesController.show);

export { router };
