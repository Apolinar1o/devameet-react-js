import { httpApiservices } from "./httpApiServices";

export class RegisterServices extends httpApiservices {

    register(body:any) {
        return this.post("/auth/register", body)
    }
}