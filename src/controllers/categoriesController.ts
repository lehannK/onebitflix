import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
  // index é o método utilizado para requisições GET
  // GET /categories
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query); // config de paginação
    try {
      const paginatedCategories = await categoryService.findAllPaginated(
        page,
        perPage
      );
      return res.json(paginatedCategories);
    } catch (error) {
      // se o erro for originado por uma instância do javascript, retornar o status 400 (erro genérico) e a mensagem do erro
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /categories/:id
  // params, diferente do 'query', pega os parâmetros de rota, no caso o ':id'
  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await categoryService.findByIdWithCourses(id);

      return res.json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
