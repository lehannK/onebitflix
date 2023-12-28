import { AuthenticatedRequest } from "../middlewares/auth";
import { User } from "../models";
import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId === episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

// procura usuário por email
export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      attributes: [
        "id",
        ["first_name", "firstName"],
        ["last_name", "lastName"],
        "phone",
        "birth",
        "email",
        "password",
      ],
      where: { email },
    });
    return user;
  },

  // cria usuário com os parâmetros passados
  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  getKeepWatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        include: [
          {
            association: "Course",
          },
        ],
        through: {
          as: "watchTime",
        },
      },
    });

    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado.");

    const keepWatchingList = filterLastEpisodesByCourse(
      userWithWatchingEpisodes.Episodes!
    );

    return keepWatchingList;
  },

  // atualizar user
  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    // atualizar os atributos do usuário no qual o ID for o mesmo passado na query
    // a variável abaixo foi desestruturada porque ela é automaticamente tipada como uma tupla de 2 valores. Somente o segundo é importante para o que queremos
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true, // returning é um método exclusivo do postgre que retorna as linhas do banco de dados que foram modificadas
    });

    return updatedUsers[0]; // updatedUsers é um array, mas como iremos atualizar um usuário de cada vez, pegamos sempre a posição 0
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      { where: { id }, returning: true, individualHooks: true } // individualHooks vai rodar o hook definido lá no model User, que é responsável por encriptar a senha
    );

    return updatedUsers[0];
  },
};
