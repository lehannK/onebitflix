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

  getTopTenByLikes: async () => {
    // podemos usar o 'sequelize?.query' para escrever código SQL diretamente aqui
    // isso permite consultas mais elaboradas do que simplesmente usar a estrutura de dados do sequelize
    const result = await Course.sequelize?.query(
      `
      SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url AS thumbnailUrl,
        COUNT(users.id) AS likes
      FROM courses 
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
          INNER JOIN users
            ON users.id = likes.user_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10
      `
    );

    // 'result' retorna uma tupla, onde queremos somente a primeira posição
    if (result) {
      const [topTen] = result;
      return topTen;
    } else {
      return null;
    }
  },
};
