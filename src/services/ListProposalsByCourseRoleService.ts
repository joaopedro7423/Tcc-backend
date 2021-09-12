import IProposalsRepository from '../repositories/IProposalsRepository';
import AppError from '../errors/AppError';
import Proposals from '../models/Proposals';

interface Irequest {
  id: string;
  role: string;
  course: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProposalsService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute({ id, role, course }: Irequest): Promise<Proposals[]> {
    //  console.log(role);

    switch (role) {
      case 'adm':
        return await this.proposalRepository.findAll();
      case 'student':
        return await this.proposalRepository.findAllNullByRoleAndCourse(
          id,
          (role = 'professor'),
          course,
        );
      case 'professor':
        return await this.proposalRepository.findAllNullByRoleAndCourse(
          id,
          (role = 'student'),
          course,
        );

      default:
        throw new AppError('Role invalido!', 400);
    }
  }
}
