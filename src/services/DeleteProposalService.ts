import validator from 'validator';

import AppError from '../errors/AppError';

import IProposalsRepository from '../repositories/IProposalsRepository';
import ProposalsRepository from '../repositories/ProposalsRepository';

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteProposalService {
  private proposalRepository: IProposalsRepository;

  constructor(proposalRepository: ProposalsRepository) {
    this.proposalRepository = proposalRepository;
  }
  public async execute(id: string): Promise<void> {
    if (!validator.isUUID(id)) {
      throw new AppError('Codigo  invalido!', 400);
    }

    const userExist = await this.proposalRepository.findById(id);

    if (!userExist) {
      throw new AppError('Propósta não existe', 401);
    }
    await this.proposalRepository.delete(id);
  }
}
