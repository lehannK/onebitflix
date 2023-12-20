/// config de rotas

import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { authController } from "./controllers/authController";

const router = express.Router();

// rota de registro de usuário
router.post("/auth/register", authController.register);

// no caminho /categories rodaremos a função de callback 'index' que foi definida no categoriesController
router.get("/categories", categoriesController.index);

export { router };
