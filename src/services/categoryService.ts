import { Category } from "../models";

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    // o offset serve para sabermos a quantidade de registros que iremos pular
    // por exemplo, se estivermos na página 2 => (2 - 1) * 10 = 10, portanto, pular 10 registros e assim, na página 2, exibir os registros do 11 ao 20
    const offset = (page - 1) * perPage;

    // filtrar pela propriedade position, ordernar crescente
    // findAndCountAll retorna somente alguns registros baseados nos nossos filtros juntamente com a contagem total de registros
    const { count, rows } = await Category.findAndCountAll({
      order: [["position", "ASC"]],
      limit: perPage,
      offset,
    });

    // aqui estamos retornando um json personalizado
    return {
      categories: rows,
      page,
      perPage,
      total: count,
    };
  },

  findByIdWithCourses: async (id: string) => {
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "courses",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });
    return categoryWithCourses;
  },
};
