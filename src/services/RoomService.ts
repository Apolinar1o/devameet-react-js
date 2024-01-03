import { httpApiservices } from "./httpApiServices";

export class RoomServices extends httpApiservices {
    getRoomByLink(link: string) {
        return this.get("/room/"+link)
    }
}