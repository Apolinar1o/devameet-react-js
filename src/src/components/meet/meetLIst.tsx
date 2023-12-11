import { useEffect, useState } from "react"
import empty from "../../../assets//images/emptyList.svg"
import { MeetServices } from "../../../services/meetServices"
import { MeetListItem } from "./meetListItem"

const meetServices = new MeetServices()

export const MeetList = () => {

    const [meets, setMeets] = useState([])

    const getMeets = async () => {
        try {
            const result = await meetServices.getMeets()

            if(result?.data) {
                setMeets(result.data)
            }
            
        } catch (e) {
            console.log("Ocorreu erro ao listar reuniões: ", e);
        }
    }

    const selectToRemove = () => {

    }

    useEffect(() => {   
        getMeets();
    }, [])
    return (
        <div className="container-meetList">
         {meets && meets.length > 0 
            ?
                meets.map((meet:any) => <MeetListItem key={meet.id} meet={meet} selectToRemove={selectToRemove}/>)
            :
            <div className="empty">
                <img src={empty} alt="" />
                <p>Você ainda não possui reuniões criadas :(</p>
            </div>
        }
        </div>
    )
}