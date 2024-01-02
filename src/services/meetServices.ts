import { httpApiservices } from "./httpApiServices";

export class MeetServices extends httpApiservices {
        
    baseUrl = "/meet"

    async getMeets() {
        return await this.get(this.baseUrl)
    }
    async getMeetById(id: string) {
        return await this.get(this.baseUrl+"/"+id)
    }
    async getMeetObjects(id: string) {
        return await this.get(this.baseUrl+"/objects/"+id)
    }

    async deleteMeet(id: string) {
        return await this.delete(this.baseUrl+"/"+id)
    }
    async creteaMeet(body:any) {
        return await  this.post(this.baseUrl, body)
    }   
    async updateMeet(body:any, id: string) {
        return await  this.put(this.baseUrl+"/"+id, body)
    }   
}