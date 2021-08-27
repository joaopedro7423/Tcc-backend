import ActivitiesStatus from "../enums/ActivitiesStatus";

export default interface CreateActivitiesDTO {
 title: string
 description: string
 status: ActivitiesStatus
 project_id: string
}
