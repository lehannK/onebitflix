import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  // aqui a porta é passada como number, diferente da config inicial que é passado como string
  port: 5433,
  database: "onebitflix_development",
  username: "postgres",
  password: "123456",
  define: {
    // essa propriedade converte automaticamente o snake_case do sql para camelCase na nossa aplicação
    underscored: true,
  },
});
