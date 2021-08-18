import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProposalsService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute(): Promise<Proposal[]> {
    const proposal = await this.proposalRepository.findAll();

    return proposal;
  }
}
