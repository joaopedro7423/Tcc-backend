import { Request, Response } from "express";

import ProjectsRepository from "../repositories/ProjectsRepository";
import UsersRepository from "../repositories/UsersRepository";

import CreateProjectService from "../services/CreateProjectService";
import ShowProjectService from "../services/ShowProjectService";
import ListAllProjectsService from "../services/ListAllProjectsService";
import UpdateProjectService from "../services/UpdateProjectService";
import UpdateProjectStatusService from "../services/UpdateProjectStatusService";

export default class ProjectsController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const projectsRepository = new ProjectsRepository();

    const projectsService = new ListAllProjectsService(projectsRepository);

    const projects = await projectsService.execute();

    return res.json(projects);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const projectsRepository = new ProjectsRepository();

    const projectsService = new ShowProjectService(projectsRepository);

    const project = await projectsService.execute(id);

    return res.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, user_id, description, logo } = request.body;
    const projectsRepository = new ProjectsRepository();
    const userRepository = new UsersRepository();
    const createProject = new CreateProjectService(
      projectsRepository,
      userRepository,
    );

    const project = await createProject.execute({
      name,
      user_id,
      description,
      logo,
    });

    return response.status(201).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, user_id } = request.body;
    const projectsRepository = new ProjectsRepository();
    const userRepository = new UsersRepository();
    const updateProject = new UpdateProjectService(
      projectsRepository,
      userRepository
    );

    const project = await updateProject.execute({
      id,
      name,
      user_id,
      description,
    });

    return response.json(project);
  }

  public async chengeStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;
    const projectsRepository = new ProjectsRepository();

    const updateProject = new UpdateProjectStatusService(projectsRepository);

    const project = await updateProject.execute({
      id,
      status,
    });

    return response.json(project);
  }
}
