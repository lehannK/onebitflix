import { Request, Response } from "express";
import { Category } from "../models";

export const categoriesController = {
  // index é o método utilizado para requisições GET
  index: async (req: Request, res: Response) => {
    try {
      // filtrar pela propriedade position, ordernar crescente
      const categories = await Category.findAll({
        order: [["position", "ASC"]],
      });
      return res.json(categories);
    } catch (error) {
      // se o erro for originado por uma instância do javascript, retornar o status 400 (erro genérico) e a mensagem do erro
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
