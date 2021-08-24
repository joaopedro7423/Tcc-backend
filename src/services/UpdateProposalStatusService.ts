import AppError from '../errors/AppError';

import IProposalsRepository from '../repositories/IProposalsRepository';
import Proposal from '../models/Proposals';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface IRequest {
  id: string;
  user_accept_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProposalStatusService {

  private proposalRepository: IProposalsRepository;
  private projectRepository: ProjectsRepository;

  constructor(proposalRepository: IProposalsRepository, projectRepository:ProjectsRepository) {
    this.proposalRepository = proposalRepository;
    this.projectRepository = projectRepository;
  }
  public async execute({ id, user_accept_id }: IRequest): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(id);

  

    if (!proposal) {
      throw new AppError('Proposal not found!', 400);
    }

    

    proposal.user_accept_id = user_accept_id;

    await this.proposalRepository.save(proposal);


    const project =  await this.projectRepository.create({
    title : proposal.title,
    description: proposal.description
    })

    this.projectRepository.save(project)

    proposal.project_id = project.id;
    await this.proposalRepository.save(proposal);

    return proposal;
  }
}
