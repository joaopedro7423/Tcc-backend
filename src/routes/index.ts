import { Router } from "express";
import userRoutes from "./user";
import sessionRoutes from "./session";
import projectRoutes from "./project";
import studentRoutes from "./student";
import campusRoutes from "./campus";
import coursesRoutes from "./courses";


const routes = Router();
const prefixRoutes = "/api/v1";

routes.get("/", (request, response) => {
  return response.json({ message: "Helo Back-End" });
});

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/students`, studentRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/projects`, projectRoutes);
routes.use(`${prefixRoutes}/campus`, campusRoutes);
routes.use(`${prefixRoutes}/courses`, coursesRoutes);


export default routes;
