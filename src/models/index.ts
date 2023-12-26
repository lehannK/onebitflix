// nesse arquivo servimos todos os models do projeto e declaramos as associações entre eles

import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { userInfo } from "os";

// por padrão do sequelize, o nome da associação é sempre o plural da segunda tabela associada
// quando quisermos referenciar essa associação em algum outro lugar, usamos o nome da associação
// para que esse recurso funcione, é necessário declarar a tabela com a primeira letra maiuscula e no singular
// por exemplo, o nome da associação abaixo será 'Courses'.
// podemos também criar um nome customizado, basta fazer dessa maneira:
// Category.hasMany(Course, {as: "nomeCustomizado"};

Category.hasMany(Course);

Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite }); // associação 'to many' que ocorre através do model Favorite
Course.belongsToMany(User, { through: Like });
Course.hasMany(Episode);
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

export { Category, Course, Episode, Favorite, Like, User };
