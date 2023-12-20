/// config de rotas

import express from "express";
import { categoriesController } from "./controllers/categoriesController";

const router = express.Router();

// no caminho /categories rodaremos a função de callback 'index' que foi definida no categoriesController
router.get("/categories", categoriesController.index);

export { router };
