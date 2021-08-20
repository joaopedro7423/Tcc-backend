import ProjectStatus from "../enums/projectStatus";

export default interface ICreateProjectDTO {
  name: string;
  user_id: string;
  description: string;
  logo?: string;
  status?: ProjectStatus;
}
