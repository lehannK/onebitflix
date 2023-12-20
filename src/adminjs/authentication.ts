import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from "bcrypt";
import { User } from "../models";

export const authenticationOptions: AuthenticationOptions = {
  // verifica se o email passado no input existe na tabela,
  // se sim, compara a senha passada com a senha do banco
  // matched retorna um boolean, que se for true, autentica o acesso
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (user && user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "senha-do-cookie",
};
