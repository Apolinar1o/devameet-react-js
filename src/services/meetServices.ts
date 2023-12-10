import { httpApiservices } from "./httpApiServices";

export class MeetServices extends httpApiservices {
        
    baseUrl = "/meet"

    async getMeets() {
        return await this.get(this.baseUrl)
    }
}