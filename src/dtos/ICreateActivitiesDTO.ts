import ActivitiesStatus from "../enums/ActivitiesStatus";

export default interface ICreateActivitiesDTO {
 title: string
 description: string
 status: ActivitiesStatus
 project_id: string
}
