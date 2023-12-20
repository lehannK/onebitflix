// nesse arquivo servimos todos os models do projeto e declaramos as associações entre eles

import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// ***IMPORTANTE: Por algum motivo as relações abaixo impedem edições nos respectivos parâmetros
// verificar o motivo

// Category.hasMany(Course);
// Course.belongsTo(Category);

// Course.hasMany(Episode);
// Episode.belongsTo(Course);

export { Category, Course, Episode, User };
