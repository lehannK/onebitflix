import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

export const episodesController = {
  // GET /episodes/stream?videoUrl=
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;

    try {
      if (typeof videoUrl !== "string")
        throw new Error("videoUrl param must be of type string");

      // range é o parametro que define a posição de um vídeo durante o streaming
      // ele vem no formato => bytes=0-1024 (string) obs*** os valores são apenas exemplo
      // o range vem sempre no header das páginas
      const range = req.headers.range;

      episodeService.streamEpisodeToResponse(res, videoUrl, range);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
