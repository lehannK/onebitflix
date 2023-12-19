import { ResourceOptions } from "adminjs";

// definindo como o adminJS irá gerenciar a tabela de categorias (propriedades e filtros de navegação)
export const categoryResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: ["name", "position"],
  filterProperties: ["name", "position", "createdAt", "updatedAt"], // usamos camelCase justamente pq la no database/index.ts definimos a propriedade underscored: true
  listProperties: ["id", "name", "position"],
  showProperties: ["id", "name", "position", "createdAt", "updatedAt"],
};
