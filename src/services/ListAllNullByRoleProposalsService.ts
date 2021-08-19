import validator from 'validator';

import AppError from '../errors/AppError';

import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllNullByRoleProposalsService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: IProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute(role: string): Promise<Proposal[]> {
    const roles = ['adm', 'student', 'professor'];

    console.log(role);

    if (!roles.includes(role)) {
      console.log(role);
      throw new AppError('Role invalido!', 401);
    }

    const proposal = await this.proposalRepository.findAllNullByRole(role);

    return proposal;
  }
}
