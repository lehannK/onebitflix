import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

// interface necessária para 'driblar' um problema de tipagem do express
export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado: nenhum token foi encontrado" });

  // aqui estamos substituindo a string 'Bearer' por nada,
  // Bearer é um prefixo que vem junto com o token e que deve ser ignorado
  const token = authorizationHeader.replace(/Bearer /, "");

  jwtService.verifyToken(token, (error, decoded) => {
    if (error || typeof decoded === "undefined")
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });

    // se o token retornado pelo Header for válido, o método acima decodifica ele, expondo as informações do payload
    // aqui é possível acessar o email do usuário porque o email está anexo ao payload
    // definimos "decoded as JwtPayload" para não ter erro de tipagem
    userService.findByEmail((decoded as JwtPayload).email).then((user) => {
      req.user = user;

      // podemos definir o ensureAuth como um middleware para todas as rotas que quisermos exigir autenticação
      // no exemplo abaixo, a rota só executará o controlador se o middleware permitir
      // router.get("/categories", ensureAuth, categoriesController.index);

      next(); // ir para o próximo middleware
    });
  });
}
