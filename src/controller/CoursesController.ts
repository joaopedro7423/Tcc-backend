import { Request, Response } from 'express';

import CoursesRepository from '../repositories/CoursesRepository';
import CampusRepository from '../repositories/CampusRepository';
import CreateCoursesService from '../services/CreateCoursesService';

import UpdateProjectService from '../services/UpdateProjectService';
import UpdateCourseService from '../services/UpdateCourseService';
import DeleteCourseService from '../services/DeleteCourseService';

export default class CoursesController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const coursesRepository = new CoursesRepository();

    const courses = await coursesRepository.findAll();

    return res.json(courses);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, campus_id } = request.body;
    const coursesRepository = new CoursesRepository();
    const campusRepository = new CampusRepository();
    const createCampus = new CreateCoursesService(
      coursesRepository,
      campusRepository,
    );

    const project = await createCampus.execute({
      name,
      campus_id,
    });

    return response.status(201).json(project);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, campus_id } = request.body;
    const coursesRepository = new CoursesRepository();
    const userRepository = new CampusRepository();
    const updateProject = new UpdateCourseService(
      coursesRepository,
      userRepository,
    );

    const project = await updateProject.execute({
      id,
      name,
      campus_id,
    });

    return response.json(project);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const coursersRepository = new CoursesRepository();
    const destroyCampus = new DeleteCourseService(coursersRepository);
    await destroyCampus.execute(id);

    return res.status(204).send();
  }
}
