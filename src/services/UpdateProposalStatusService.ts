import AppError from '../errors/AppError';

import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';

interface IRequest {
  id: string;
  user_accept_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProposalStatusService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute({ id, user_accept_id }: IRequest): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(id);

    if (!proposal) {
      throw new AppError('Proposal not found!', 400);
    }

    proposal.user_accept_id = user_accept_id;

    await this.proposalRepository.save(proposal);

    return proposal;
  }
}
