import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

// se estivessemos usando JS puro, precisariamos tipar as tabelas usando o DataTypes, que é uma lib do sequelize
// como estamos usando TS, podemos simplesmente criar uma interface
export interface Category {
  id: number;
  name: string;
  position: number;
}

// aqui estamos definindo que os atributos necessários para criar uma nova categoria são herdados pela categoria 'Category', com excessão do atributo 'id', pois esse será gerado automaticamente no nosso db
export interface CategoryCreationAttributes extends Optional<Category, "id"> {}

// essa é a interface do objeto já instanciado, ou seja, após ele ser criado e inputado no db
// "Model" é uma classe nativa do sequelize. É preciso usar ela para a herança funcionar
export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

export const Category = sequelize.define<CategoryInstance, Category>(
  "Category",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  }
);
