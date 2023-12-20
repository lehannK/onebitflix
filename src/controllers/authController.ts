import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";

export const authController = {
  // rota POST /auth/register
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
  // POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Email não registrado" });
      }

      user.checkPassword(password, (error, isSame) => {
        if (error) return res.status(400).json({ message: error.message });
        if (!isSame)
          return res.status(401).json({ message: "Senha incorreta" });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        // se as verificações de email e senha forem válidas, o JWT gera um token
        const token = jwtService.signToken(payload, "1d");

        return res.json({ authenticated: true, ...payload, token });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
