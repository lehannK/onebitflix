import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};

// aqui definimos a forma como os vídeos serão tratados
// primeiramente, nunca armazenamos arquivos de video na DB
// nós armazenamos eles localmente ou em nuvem, e os referenciamos via URL

// a função abaixo está usando uma lib do @adminjs/upload, que irá indicar o local dos arquivos
export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        // caminho absoluto no qual o adminJS salvará os arquivos upados, = /uploads na raiz
        bucket: path.join(__dirname, "..", "..", "..", "uploads"),
      },
    },
    properties: {
      // nome da propriedade que armazenará a URL
      key: "videoUrl",
      // input onde faremos o upload do video lá no painel administrativo
      file: "uploadVideo",
    },
    // aqui customizamos a estrutura de pastas/nomes dos arquivos salvos.
    // lá em cima, definimos o caminho absoluto que será /uploads
    // aqui, estamos definindo que dentro de uploads haverá "videos/curse[curse-id]/nome-do-arquivo"
    uploadPath: (record, filename) =>
      `videos/curse-${record.get("courseId")}/${filename}`,
  }),
];
