// src/controllers/usersController.ts

import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
  // GET /users/current
  // obter informações do usuário atual
  // como o middleware de auth já retorna todos os dados do user caso haja um token válido, essa função ficou bem curta e nem precisou de um service separado

  show: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentUser = req.user!;
      return res.json(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /users/current/watching
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const watching = await userService.getKeepWatchingList(id);
      return res.json(watching);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // PUT /users/current
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, phone, email, birth } = req.body;

    try {
      const updatedUser = await userService.update(id, {
        firstName,
        lastName,
        phone,
        email,
        birth,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
