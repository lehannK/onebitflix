import { Request, Response } from "express";
import { userService } from "../services/userService";

export const authController = {
  // verifica se o email passado no cadastro já não existe no banco de dados
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, birth, phone } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);

      if (userAlreadyExists) {
        throw new Error("Este email já está cadastrado");
      }

      // se não houver erro, registrar o usuário com exatamente os parâmetros passados no body do json
      // por padrão será role = user
      const user = await userService.create({
        firstName,
        lastName,
        birth,
        phone,
        email,
        password,
        role: "user",
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
