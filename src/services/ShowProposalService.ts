import AppError from '../errors/AppError';
import  Proposals  from '../models/Proposals';

import IProposalRepository from '../repositories/IProposalsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

//essa parada (Service) aqui que se faz as regras de negócio
export default class ShowProposalService {
  private proposalRepository: IProposalRepository;

  private userRepository: IUsersRepository;

  constructor(proposalRepository: IProposalRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute(id: string): Promise<Proposals> {
    const proposal = await this.proposalRepository.findById(id);

    if (!proposal) {
      throw new AppError('Proposal not found!', 400);
    }

    return proposal;
  }
}
