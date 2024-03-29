import { Request, Response } from 'express';

import ProposalsRepository from '../repositories/ProposalsRepository';
import UsersRepository from '../repositories/UsersRepository';

import ListAllProposalsService from '../services/ListProposalsServiceByRole';
import ListProposalsByCourseRoleService from '../services/ListProposalsByCourseRoleService';
import ShowProposalService from '../services/ShowProposalService';
import CreateProposalService from '../services/CreateProposalService';
import UpdateProposalService from '../services/UpdateProposalService';
import UpdateProposalStatusService from '../services/UpdateProposalStatusService';
import DeleteProposalService from '../services/DeleteProposalService';

import ProjectsRepository from '../repositories/ProjectsRepository';

/*
Aqui que se utiliza as regras de negócios 
*/

export default class ProposalsController {
  public async index(req: Request, res: Response): Promise<Response> {
    //console.log(req.user);

    const proposalsRepository = new ProposalsRepository();

    const proposalService = new ListAllProposalsService(proposalsRepository);

    const projects = await proposalService.execute({
      id: req.user.id,
      role: req.user.role,
    });

    return res.json(projects);
  }

  public async listProposalByRoleAndCourse(
    req: Request,
    res: Response,
  ): Promise<Response> {
    //console.log(req.user);

    const proposalsRepository = new ProposalsRepository();

    const proposalService = new ListProposalsByCourseRoleService(
      proposalsRepository,
    );

    const projects = await proposalService.execute({
      id: req.user.id,
      role: req.user.role,
      course: req.user.course_id,
    });

    return res.json(projects);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const proposalsRepository = new ProposalsRepository();

    const proposalService = new ShowProposalService(proposalsRepository);

    const project = await proposalService.execute(id);

    return res.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const user_create_id = request.user.id;
    const proposalsRepository = new ProposalsRepository();
    const userRepository = new UsersRepository();
    const createProject = new CreateProposalService(
      proposalsRepository,
      userRepository,
    );

    const project = await createProject.execute({
      title,
      user_create_id,
      description,
    });

    return response.status(201).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, description } = request.body;
    const user_create_id = request.user.id;
    const proposalsRepository = new ProposalsRepository();
    const userRepository = new UsersRepository();
    const updateProject = new UpdateProposalService(
      proposalsRepository,
      userRepository,
    );

    const project = await updateProject.execute({
      id,
      title,
      user_create_id,
      description,
    });

    return response.json(project);
  }

  public async chengeStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const proposalsRepository = new ProposalsRepository();
    const projectRepository = new ProjectsRepository();
    const userRepository = new UsersRepository();

    const updateProject = new UpdateProposalStatusService(
      proposalsRepository,
      projectRepository,
      userRepository,
    );

    const project = await updateProject.execute({
      id,
      user_accept_id: request.user.id,
    });

    return response.json(project);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const proposalsRepository = new ProposalsRepository();
    const destroyProposal = new DeleteProposalService(proposalsRepository);
    await destroyProposal.execute(id);

    return res.status(204).send();
  }
}
