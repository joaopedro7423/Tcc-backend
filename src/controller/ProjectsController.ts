import { Request, Response } from 'express';

import ProjectsRepository from '../repositories/ProjectsRepository';

import CreateProjectService from '../services/CreateProjectService';
import ShowProjectService from '../services/ShowProjectService';
import ListAllProjectsService from '../services/ListAllProjectsService';
import UpdateProjectService from '../services/UpdateProjectService';
import DeleteProjectService from '../services/DeleteProjectService';

export default class ProjectsController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const projectsRepository = new ProjectsRepository();
    const { id, role } = req.user;
    // console.log(user_id)
    const projectsService = new ListAllProjectsService(projectsRepository);

    const projects = await projectsService.execute({ user_id: id, role });

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
    const { title, description } = request.body;
    const projectsRepository = new ProjectsRepository();

    const createProject = new CreateProjectService(projectsRepository);

    const project = await createProject.execute({
      title,
      description,
    });

    return response.status(201).json(project);
  }
  /*
  public async uploadLogo(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { filename } = request.file;
    const projectsRepository = new ProjectsRepository();
    const service = new UploadLogoOfProjectProjectService(projectsRepository);

    const project = await service.execute({
      id,
      logo: filename,
    });

    return response.json(project);
  }
*/
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description } = request.body;
    const projectsRepository = new ProjectsRepository();
    const updateProject = new UpdateProjectService(projectsRepository);

    const project = await updateProject.execute({
      id,
      title,
      description,
    });

    return response.json(project);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const projectsRepository = new ProjectsRepository();
    const destroyProposal = new DeleteProjectService(projectsRepository);
    await destroyProposal.execute(id);

    return res.status(204).send();
  }
  /*
  public async chengeStatus(
    request: Request,
    response: Response,
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
  */
}
