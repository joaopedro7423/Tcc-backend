import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';
import AppError from '../errors/AppError';

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProposalsService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute(role: string): Promise<Proposal[]> {
    // console.log(role);

    switch (role) {
      case 'adm':
        return await this.proposalRepository.findAll();
      case 'student':
        return await this.proposalRepository.findAllNullByRole('professor');
      case 'professor':
        return await this.proposalRepository.findAllNullByRole('student');

      default:
        throw new AppError('Role invalido!', 400);
    }
    /*
    if (role == 'adm') {
      return await this.proposalRepository.findAll();
    } else if (role == 'student') {
      return await this.proposalRepository.findAllNullByRole('professor');
    } else if (role == 'professor') {
      return await this.proposalRepository.findAllNullByRole('student');
    } else {
      throw new AppError('Role invalido!', 400);
    }*/
  }
}
