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
};
