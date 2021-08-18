import validator from 'validator';

import AppError from '../errors/AppError';
import Campus from '../models/Campus';

import ICampusRepository from '../repositories/ICampusRepository';
import CampusRepository from '../repositories/CampusRepository';

interface Request {
  id: string;
  name: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateCampusService {
  private campusRepository: ICampusRepository;

  constructor(campusRepository: CampusRepository) {
    this.campusRepository = campusRepository;
  }
  public async execute({ id, name }: Request): Promise<Campus> {
    if (!validator.isUUID(id)) {
      throw new AppError('Codigo do campus invalido!', 400);
    }
    const campus = await this.campusRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!campus) {
      throw new AppError('Campus não encontrado!', 400);
    }
    //console.log(campus)

    const nameUpper = name.toUpperCase().trim();
    //console.log(nameUpper);

    //verifica se o name fornecido pelo usuário é diferente do que já tem
    if (nameUpper !== campus.name) {
      const campusExist = await this.campusRepository.findOneByName(nameUpper);
      //console.log(campusExist);

      //verifica se o nome do campus já existe

      if (campusExist) {
        throw new AppError('Esse campus já é cadastrado!', 401);
      }
    } else {
      throw new AppError('Campus com nome fornecido igual!', 401);
    }

    campus.name = nameUpper;

    //salva
    await this.campusRepository.save(campus);

    return campus;
  }
}
