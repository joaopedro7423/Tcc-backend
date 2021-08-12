import { hash } from "bcrypt";
import Campus from "../models/Campus";
import AppError from "../errors/AppError";


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
  public async execute({
    id,
    name
  }: Request): Promise<Campus> {
    const campus = await this.campusRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!campus) {
      throw new AppError("Campus não encontrado!", 400);
    }

    //verifica se o name fornecido pelo usuário é diferente do que já tem
    if (name !== campus.name) {
      const campusExist = await this.campusRepository.findAllByName(name);

      //se o name fornecido pelo usuario já estiver em uso, retorna esse error
      if (campusExist) {
        throw new AppError("Campus já existe!", 401);
      }
    }


    //caso se passe dessas 2 condições
    //atualizase os dados do objeto
    campus.name = name;
    //salva
    await this.campusRepository.save(campus);

    return campus;
  }
}
