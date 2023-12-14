import { MeetAddEditHeader } from "./MeetAddEditHeader"
import trashIcon from "../../../assets/images/trash-object.svg"
import rotateRight from "../../../assets/images/rotate-right.svg"
import rotateLeft from "../../../assets/images/rotate-left.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MeetServices } from "../../../services/meetServices"
import { MeetObjectsRoom } from "./meetObjectsRoom"

const meetService = new MeetServices()
export const MeetAdd = () => {

    const [name, setName] = useState("")
    const [color, setColor] = useState("")
    const navigate = useNavigate()

    const goBack =() => {
      return  navigate(-1)
    }

    const isFormInvalid = (!name  || name.trim().length < 5 || !color || color.trim().length < 4 )

    const doSave = async () => {
        try {    
            if( isFormInvalid) {
              return 
            } 
            
   
            await meetService.creteaMeet({name, color})
            return goBack();
    
           } catch (e:any) {
            
              if(e?.response?.data?.message) {
                console.log("eeror ao efetuar Login", e)
              } else {
                          console.log("eeror ao efetuar Login")
              }
            
           }
    }

    return (
        <div className="container-principal">
            <div className="container-meet">
                    <MeetAddEditHeader name={name} color={color} setName={setName} setColor={setColor} isEdit={false}/>
                    <div className="actions">
                    <span onClick={goBack}>voltar</span>
                    <button onClick={doSave} disabled={isFormInvalid} className={isFormInvalid ?"disabled": ""}>salvar</button>
                    </div>
            </div>
            <MeetObjectsRoom />
        </div>
    )
}