import { Request, Response } from "express";
import { Category } from "../models";

export const categoriesController = {
  // index é o método utilizado para requisições GET
  index: async (req: Request, res: Response) => {
    try {
      // filtrar pela propriedade position, sentido crescente
      const categories = await Category.findAll({
        order: [["position", "ASC"]],
      });
      return res.json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
