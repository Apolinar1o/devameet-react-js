import { useState } from "react";
import { RoomObjects } from "../room/roomObjects";
import {MeetHeader} from "./meetHeader";
import { MeetList } from "./meetLIst";
import { useNavigate } from "react-router-dom";

export const Meethome = () => {

    const [objects, setObjects] = useState([])
    const [link, setLink] = useState("")
    const navigate = useNavigate()

    const EnterRoom = () => [
        navigate("/room/" + link)
    ]


    return (
        <div className="container-principal">
            <div className="container-meet">
                    <MeetHeader/>
                    <MeetList setObjects={setObjects} setLink={setLink}/>
            </div>
            { objects?.length > 0 && <RoomObjects objects={objects} enterRoom={EnterRoom}/>}
        </div>
    )
}