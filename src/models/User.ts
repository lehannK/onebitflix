// src/models/User.ts

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt"; // criptografia de senhas

// type usado lá em baixo na função do JWT
// primeiro parâmetro é um erro e o segundo é o booleano que retorna true se a senha for valida
type CheckPasswordCallback = (error?: Error, isSame?: boolean) => void;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserCreationAttributes extends Optional<User, "id"> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export const User = sequelize.define<UserInstance, User>(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    // ***IMPORTANTE
    // Aqui definimos a criptografia da senha que será armazenada no banco
    hooks: {
      beforeSave: async (user) => {
        // se o usuário cadastrado for novo ou se houver atualização de senha em um usuário já existente, o método aplica a cripgrafia na senha.
        // aqui é necessário instalar o pacote bcrypt
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

// esse método utilizando o bcrypt será usado pelo JWT
User.prototype.checkPassowrd = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  bcrypt.compare(password, this.password, (error, isSame) => {
    if (error) {
      callbackfn(error);
    } else {
      callbackfn(error, isSame);
    }
  });
};
