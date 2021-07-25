import { Request, Response } from "express";

import ProjectsRepository from "../repositories/ProjectsRepository";
import UsersRepository from "../repositories/UsersRepository";

import CreateProjectService from "../services/CreateProjectService";
import CreateUsersService from "../services/CreateUsersService";
import ListAllProjectsService from "../services/ListAllProjectsService";

export default class ProjectController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const projectsRepository = new ProjectsRepository();

    const projectsService = new ListAllProjectsService(projectsRepository);

    const projects = await projectsService.execute();

    return res.json(projects);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, user_id } = request.body;
    const projectsRepository = new ProjectsRepository();
    const userRepository = new UsersRepository();
    const createProject = new CreateProjectService(
      projectsRepository,
      userRepository
    );

    const project = await createProject.execute({
      name,
      user_id,
      description,
    });

    return response.status(201).json(project);
  }
}
