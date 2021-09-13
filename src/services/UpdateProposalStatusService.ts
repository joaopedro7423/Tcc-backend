import AppError from '../errors/AppError';
import Proposals from '../models/Proposals';

import IProposalsRepository from '../repositories/IProposalsRepository';
import ProjectsRepository from '../repositories/ProjectsRepository';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  id: string;
  user_accept_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProposalStatusService {
  private proposalRepository: IProposalsRepository;
  private projectRepository: ProjectsRepository;
  private userRepository: UsersRepository;

  constructor(
    proposalRepository: IProposalsRepository,
    projectRepository: ProjectsRepository,
    userRepository: UsersRepository,
  ) {
    this.proposalRepository = proposalRepository;

    this.projectRepository = projectRepository;

    this.userRepository = userRepository;
  }
  public async execute({ id, user_accept_id }: IRequest): Promise<Proposals> {
    // console.log(user_accept_id);
    //console.log(id);
    const proposal = await this.proposalRepository.findById(id);

    //console.log(id_project);

    if (!proposal) {
      throw new AppError('Proposta não encontrado!', 400);
    }

    // console.log(proposal.project);

    const projectExist = proposal.project;
    //console.log(id_project);

    /*
    const projectExist = await this.projectRepository.findById(id_project);

    */
    if (projectExist) {
      throw new AppError('O projeto já existe!', 400);
    }

    const userAccept = await this.userRepository.findById(user_accept_id);

    if (!userAccept) {
      throw new AppError('Usuário não encontrado!', 400);
    }

    proposal.userAccept = userAccept;

    await this.proposalRepository.save(proposal);

    const project = await this.projectRepository.create({
      title: proposal.title,
      description: proposal.description,
    });

    this.projectRepository.save(project);

    proposal.project = project;

    await this.proposalRepository.save(proposal);

    return proposal;
  }
}
