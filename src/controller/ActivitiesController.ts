import { Request, Response } from 'express';
import ActivitiesRepository from '../repositories/ActivitiesRepository';
import CreateActivitiesService from '../services/CreateActivitiesService';
import DeleteActivitiesService from '../services/DeleteActivitiesService';
import ListAllActivitiesService from '../services/ListAllActivitiesService';
import UpdadteActivitiesService from '../services/UpdadteActivitiesService';

export default class ActivitiesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const activitiesRepository = new ActivitiesRepository();

    const projectsService = new ListAllActivitiesService(activitiesRepository);

    const activities = await projectsService.execute();

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

    const updateActivities = new UpdadteActivitiesService(activitiesRepository);

    const activities = await updateActivities.execute({
      id,
      title,
      description,
    });

    return res.status(201).json(activities);
  }

  public async destroy(req: Request, res: Response):Promise<Response>{
    const { id } = req.params;
  
    const activitiesRepository = new ActivitiesRepository();

    const destoryActivities = new DeleteActivitiesService(activitiesRepository);

    await destoryActivities.execute(id)

    return res.status(204).send("Atividade deletado com sucesso")


  }



}
