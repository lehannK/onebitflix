import { User } from "../models";
import { UserCreationAttributes } from "../models/User";

// procura usuário por email
export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  // cria usuário com os parâmetros passados
  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },
};
