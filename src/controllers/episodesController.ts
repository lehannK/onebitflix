import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";
import { AuthenticatedRequest } from "../middlewares/auth";

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

  // GET /episode/:id/watchTime
  getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;

    try {
      const watchTime = await episodeService.getWatchTime(
        userId,
        Number(episodeId)
      );

      return res.status(200).json(watchTime);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /episodes/:id/watchTime
  setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    const episodeId = req.params.id;
    const { seconds } = req.body;

    try {
      const watchTime = await episodeService.setWatchTime(
        userId,
        Number(episodeId),
        seconds
      );

      return res.status(200).json(watchTime);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
