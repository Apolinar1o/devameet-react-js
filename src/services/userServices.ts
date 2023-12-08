import { httpApiservices } from "./httpApiServices";


export class UserServices extends httpApiservices {
    async update(body:any) {
        return await this.put("/user", body)
    }
}