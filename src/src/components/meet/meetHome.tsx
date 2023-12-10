import {MeetHeader} from "./meetHeader";
import { MeetList } from "./meetLIst";

export const Meethome = () => {
    return (
        <div className="container-principal">
            <div className="container-meet">
                    <MeetHeader/>
                    <MeetList/>
            </div>
        </div>
    )
}