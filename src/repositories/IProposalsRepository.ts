import ICreateProposalsDTO from "../dtos/ICreateProposalsDTO";
import Proposal from "../models/Proposals";

export default interface IProposalsRepository {
  findAll(): Promise<Proposal[]>;
  findById(id: string): Promise<Proposal | undefined>;
  create(createProposal: ICreateProposalsDTO): Promise<Proposal>;
  save(project: Proposal): Promise<Proposal>;
}
