import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/favoriteService";

export const favoritesController = {
  // POST /favorites
  save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const { courseId } = req.body;

    try {
      const favorite = await favoriteService.create(userId, Number(courseId));
      return res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /favorites
  index: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;

    try {
      const favorites = await favoriteService.findByUserId(userId);
      return res.status(200).json(favorites);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // DETELE /favorites/:id
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const courseId = req.params.id;

    try {
      await favoriteService.delete(userId, Number(courseId));

      return res.status(204).send(); // send() = resposta vazia
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
