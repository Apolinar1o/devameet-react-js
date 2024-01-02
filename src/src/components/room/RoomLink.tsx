import { PublicInput } from "../general/publicInput"
import { MeetHeader } from "../meet/meetHeader"
import chainIcon from "../../../assets/images/chain.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RoomLink = () => {

    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()


    const enterMeet = () => {
        setError("")
        if(link && link.length >= 8) {
            return navigate("room/"+ link)
        }
        setError("LInk inválido, por favor veririque")
    }   
    return (
        <>
        <div className="container-principal">
            <div className="container-meet link">
                <MeetHeader isLink={true}/>
                {error && <p className="error">{error}</p> }
                <PublicInput 
                type="text"
                alt="link"
                name="Informe o link da reunião para entrar"
                modelValue={link}
                icon={chainIcon}
                setValue={setLink}/>
                <button onClick={enterMeet}>Entrar</button>
            </div>
        </div>

        </>
    )
}