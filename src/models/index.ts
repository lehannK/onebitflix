// nesse arquivo servimos todos os models do projeto e declaramos as associações entre eles

import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";
import { User } from "./User";

Category.hasMany(Course, { as: "courses" }); // as: 'courses' --- nome da associação
Course.belongsTo(Category);

Course.hasMany(Episode);
Episode.belongsTo(Course);

export { Category, Course, Episode, User };
