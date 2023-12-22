// nesse arquivo servimos todos os models do projeto e declaramos as associações entre eles

import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

// por padrão do sequelize, o nome da associação é sempre o plural da segunda tabela associada
// quando quisermos referenciar essa associação em algum outro lugar, usamos o nome da associação
// para que esse recurso funcione, é necessário declarar a tabela com a primeira letra maiuscula e no singular
// por exemplo, o nome da associação abaixo será 'Courses'.
// podemos também criar um nome customizado, basta fazer dessa maneira:
// Category.hasMany(Course, {as: "nomeCustomizado"};

Category.hasMany(Course);

Course.belongsTo(Category);
Course.hasMany(Episode);

Episode.belongsTo(Course);

export { Category, Course, Episode, User };
