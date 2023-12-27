import { Response } from "express";
import path from "path";
import fs from "fs";
import { WatchTime } from "../models";
import { WatchTimeAttributes } from "../models/WatchTime";

export const episodeService = {
  streamEpisodeToResponse: (
    res: Response,
    videoUrl: string,
    range: string | undefined
  ) => {
    const filePath = path.join(__dirname, "..", "..", "uploads", videoUrl);
    const fileStat = fs.statSync(filePath); // a função fs.statSync() retorna os metadados do arquivo, como tamanho, data de criação, permissões de acesso etc.

    if (range) {
      // aqui estamos modificando a string 'range'
      // estamos substituindo o 'bytes=' por nada, e splitando os valores usando como referencia o hífen
      const parts = range.replace(/bytes=/, "").split("-");

      const start = parseInt(parts[0], 10); // start pega o 'parts' na posição zero, ou seja, do lado esquerdo do hífen, e indica que ele é numero de base 10.

      const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1; // end pega o lado direito do hífen SE ele existir. Se ele não existir, pega o tamanho total do arquivo e define ele como sendo o 'end'. O -1 é uma correção devido os bytes serem contados a partir do 0.

      const chunkSize = end - start + 1; // chunkSize seria o tamanho do pedaço do arquivo

      // ***OBS : o start e o end são gerenciados automaticamente pelo navegador a partir da qualidade de banda larga entre outras variáveis

      const file = fs.createReadStream(filePath, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`, // inicio & fim do arquivo total
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head); // 206, código de arquivo servido parcial

      file.pipe(res);
    } else {
      const head = {
        // se o range não for fornecido, retornar o video completo
        "Content-Length": fileStat.size,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);

      fs.createReadStream(filePath).pipe(res);
    }
  },

  getWatchTime: async (userId: number, episodeId: number) => {
    const watchTime = await WatchTime.findOne({
      attributes: ["seconds"],
      where: {
        userId,
        episodeId,
      },
    });
    return watchTime;
  },

  setWatchTime: async (userId: number, episodeId: number, seconds: number) => {
    const watchTimeAlreadyExists = await WatchTime.findOne({
      where: {
        userId,
        episodeId,
      },
    });

    // se já houver o watchtime, apenas atualizar o second
    if (watchTimeAlreadyExists) {
      watchTimeAlreadyExists.seconds = seconds;
      await watchTimeAlreadyExists.save();
      return watchTimeAlreadyExists;
    } else {
      const watchTime = await WatchTime.create({
        userId,
        episodeId,
        seconds,
      });
      return watchTime;
    }
  },
};
