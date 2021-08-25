import AppError from '../errors/AppError';
import Proposals  from '../models/Proposals';

import IProposalsRepository from '../repositories/IProposalsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  title: string;
  user_create_id: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProposalService {
  private projectRepository: IProposalsRepository;

  private userRepository: IUsersRepository;

  constructor(
    projectRepository: IProposalsRepository,
    userRepository: IUsersRepository,
  ) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }
  public async execute({
    id,
    title,
    user_create_id,
    description,
  }: IRequest): Promise<Proposals> {
    const proposal = await this.projectRepository.findById(id);

    if (!proposal) {
      throw new AppError('Proposal not found!', 400);
    }

    const userExist = await this.userRepository.findById(user_create_id);

    if (!userExist) {
      throw new AppError('User not found!', 400);
    }

    proposal.title = title;
    proposal.description = description;

    await this.projectRepository.save(proposal);

    return proposal;
  }
}
