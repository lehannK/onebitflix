// nesse arquivo servimos todos os models do projeto e declaramos as associações entre eles

import { Category } from "./Category";
import { Course } from "./Course";

Category.hasMany(Course);
Course.belongsTo(Category);

export { Category, Course };
