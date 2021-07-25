import { Router } from "express";
import userRoutes from "./user";
import sessionRoutes from "./session";
import projectRoutes from "./projects";

const routes = Router();
const prefixRoutes = "/api/v1";

routes.get("/", (request, response) => {
  return response.json({ message: "Helo Back-End" });
});

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/projects`, projectRoutes);

export default routes;