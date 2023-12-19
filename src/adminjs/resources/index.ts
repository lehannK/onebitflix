import { ResourceWithOptions } from "adminjs";
import { Category, Course } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";

// apontando para o adminJS quais são os models que ele irá gerenciar
export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Course,
    options: courseResourceOptions,
  },
];
