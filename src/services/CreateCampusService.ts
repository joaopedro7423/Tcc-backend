import Campus from '../models/Campus';
import AppError from '../errors/AppError';

import ICampusRepository from '../repositories/ICampusRepository';
import CampusRepository from '../repositories/CampusRepository';

interface Request {
  name: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateCampusService {
  private campusRepository: ICampusRepository;

  constructor(campusRepository: CampusRepository) {
    this.campusRepository = campusRepository;
  }
  public async execute({ name }: Request): Promise<Campus> {
    const nameUpper = name.toUpperCase().trim();

   // console.log(nameUpper);
    const campusExist = await this.campusRepository.findOneByName(nameUpper);

    if (campusExist) {
      //console.log(campusExist)
      throw new AppError('Campus já utilizado', 401);
    }

    const campus = await this.campusRepository.create(nameUpper);

    return campus;
  }
}
