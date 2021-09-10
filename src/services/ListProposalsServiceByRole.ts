import IProposalsRepository from '../repositories/IProposalsRepository';
import AppError from '../errors/AppError';
import  Proposals  from '../models/Proposals';

interface Irequest{
  id: string,
  role: string
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProposalsService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute({id,role}:Irequest): Promise<Proposals[]> {
    // console.log(role);

    switch (role) {
      case 'adm':
        return await this.proposalRepository.findAll();
      case 'student':
        return await this.proposalRepository.findAllNullByRole('professor');
      case 'professor':
        return await this.proposalRepository.findAllNullById(id);

      default:
        throw new AppError('Role invalido!', 400);
    }
    /*
    if (role == 'adm') {
      return await this.proposalRepository.findAll();
    } else if (role == 'notification') {
      return await this.proposalRepository.findAllNullByRole('professor');
    } else if (role == 'professor') {
      return await this.proposalRepository.findAllNullByRole('notification');
    } else {
      throw new AppError('Role invalido!', 400);
    }*/
  }
}
