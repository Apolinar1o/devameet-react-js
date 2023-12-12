import { httpApiservices } from "./httpApiServices";

export class MeetServices extends httpApiservices {
        
    baseUrl = "/meet"

    async getMeets() {
        return await this.get(this.baseUrl)
    }

    async deleteMeet(id: string) {
        return await this.delete(this.baseUrl+"/"+id)
    }
    async creteaMeet(body:any) {
        return await  this.post(this.baseUrl, body)
    }   
}