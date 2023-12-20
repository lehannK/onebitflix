import AdminJS, { PageHandler } from "adminjs";
import { Category, Course, Episode, User } from "../models";

export const dashboardOptions: {
  handler?: PageHandler;
  component?: string;
} = {
  // aqui, definimos os componentes e handlers react para customizar nosso dashboard
  component: AdminJS.bundle("./components/Dashboard"), //apontamos que o jsx/tsx está nesse diretório
  handler: async (req, res, context) => {
    // esse handler serve para contar todos os registros da nossa db
    const courses = await Course.count();
    const episodes = await Episode.count();
    const categories = await Category.count();
    const standardUsers = await User.count({ where: { role: "user" } });

    // retornamos esses registros no formato json
    res.json({
      Cursos: courses,
      Episódios: episodes,
      Categorias: categories,
      Usuários: standardUsers,
    });
  },
};
