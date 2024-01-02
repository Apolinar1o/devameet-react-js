import roomIcon from "../../../assets/images/room.svg"
import copyIcon from "../../../assets/images/copy.svg"
import trash from "../../../assets/images/trash.svg"
import editIcon from "../../../assets/images/edit.svg"
import React from "react"
import { useNavigate } from "react-router-dom"

type meetListItemProps = {
    meet:any,
    selected:string,
    selectMeet(meet: any):void
    selectToRemove(id: string):any
}

export const MeetListItem: React.FC<meetListItemProps> = ({meet, selectToRemove, selectMeet, selected}) => {

    const mobile = window.innerWidth <= 992

    const navigate = useNavigate()

    const goToRoom = () => {
        navigate("/room/"+ meet?.link)
    }

    const goToEdit = () => {
        navigate("/edit/"+ meet?.id)
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href + "room/ " + meet?.link)
    }

    return (
        <div className="container-meetListItem">
            <div className="meet" onClick={() => selectMeet(meet)}>
                <div className="color" style={{backgroundColor:meet.color}}>
                    
                </div>
                <span className={selected === meet?.id ? "selected" : ""}>{meet.name}</span>
            </div>

            <div className="actions">
            
            {mobile && <img src={roomIcon} alt="entrar na reuniao"onClick={goToRoom} /> }
            <img src={copyIcon} alt="copiar link da reunião" onClick={copyLink}/>
            {!mobile && <img src={editIcon} alt="editar reuniao"onClick={goToEdit }/> }
            <img src={trash} alt="deletar reuniao" onClick={() => selectToRemove(meet?.id)}/>
            </div>
        </div>
    )
}