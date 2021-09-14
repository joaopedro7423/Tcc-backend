import { Request, Response } from 'express';
import ActivitiesRepository from '../repositories/ActivitiesRepository';
import CreateActivitiesService from '../services/CreateActivitiesService';
import DeleteActivitiesService from '../services/DeleteActivitiesService';
import ListAllActivitiesByProjectIdService from '../services/ListAllActivitiesByProjectIdService';
import ListAllActivitiesService from '../services/ListAllActivitiesService';
import UpdateActivitiesService from '../services/UpdateActivitiesService';
import UpdateActivitiesStatusService from '../services/UpdateActivitiesStatusService';

export default class ActivitiesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const activitiesRepository = new ActivitiesRepository();

    const projectsService = new ListAllActivitiesService(activitiesRepository);

    const activities = await projectsService.execute();

    return res.json(activities);
  }

  public async listByProjectId(req: Request, res: Response): Promise<Response> {
    const { id_project } = req.params;
      console.log(id_project)
    const activitiesRepository = new ActivitiesRepository();

    const projectsService = new ListAllActivitiesByProjectIdService(activitiesRepository);

    const activities = await projectsService.execute({
      id_project
    });

    return res.json(activities);
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, project_id } = request.body;
    const activitiesRepository = new ActivitiesRepository();

    const createActivitiers = new CreateActivitiesService(activitiesRepository);

    const activities = await createActivitiers.execute({
      title,
      description,
      project_id,
    });

    return response.status(201).json(activities);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;

    const activitiesRepository = new ActivitiesRepository();

    const updateActivities = new UpdateActivitiesService(activitiesRepository);

    const activities = await updateActivities.execute({
      id,
      title,
      description,
    });

    return res.status(201).json(activities);
  }

  public async chengeStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status } = req.body;

    const activitiesRepository = new ActivitiesRepository();

    const updateActivities = new UpdateActivitiesStatusService(
      activitiesRepository,
    );

    const activitie = await updateActivities.execute({
      id,
      status,
    });

    return res.status(201).json(activitie);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const activitiesRepository = new ActivitiesRepository();

    const destoryActivities = new DeleteActivitiesService(activitiesRepository);

    await destoryActivities.execute(id);

    return res.status(204).send();
  }
}
