import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        separate: true, // necessário para o order funcionar
      },
    });
    return courseWithEpisodes;
  },

  // função que sorteia os cursos setados como 'featured' para serem exibidos
  // os cursos são sorteados para que haja uma rotatividade de exibição na tela
  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });
    const randomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    // exibir os 3 primeiros cursos
    // a cada execução, os 3 cursos exibidos serão diferentes
    return randomFeaturedCourses.slice(0, 3);
  },

  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
    });
    return courses;
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          // Op. é uma lib do sequelize que disponibiliza os operadores do SQL
          // usamos o iLike para personalizar a experiencia de busca para trazer resultados semelhantes e não somente exatos
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset,
    });
    return {
      courses: rows,
      page,
      perPage,
      total: count,
    };
  },
};
