import { Request, Response } from 'express';
import ActivitiesRepository from '../repositories/ActivitiesRepository';



export default class ActivitiesController{

    public async index(req: Request, res: Response): Promise<Response> {
        const activitiesRepository = new ActivitiesRepository();
    
       // const projectsService = new ListAllProjectsService(projectsRepository);
    
        //const activities = await projectsService.execute();
    
        return res.json("activities");
      }



}