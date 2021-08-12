import { Request, Response } from 'express';
import CampusRepository from '../repositories/CampusRepository';
import CreateCampusService from '../services/CreateCampusService';
import DeleteCampusService from '../services/DeleteCampusService';
import UpdateCampusService from '../services/UpdateCampusService';

export default class CampusController {
  public async index(req: Request, res: Response): Promise<Response> {
    const campusRepository = new CampusRepository();

    const campus = await campusRepository.findAll();

    return res.json(campus);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const campusRepository = new CampusRepository();
    const createCampus = new CreateCampusService(campusRepository);

    const campus = await createCampus.execute({
      name,
    });

    return res.status(201).json(campus);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name } = req.body;

    const campusRepository = new CampusRepository();
    const updateUsers = new UpdateCampusService(campusRepository);

    const campus = await updateUsers.execute({
      id,
      name
    });

    return res.json(campus);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const campusRepository = new CampusRepository();
    const destroyCampus = new DeleteCampusService(campusRepository);
    await destroyCampus.execute(id);

    return res.status(204).send();
  }
}
