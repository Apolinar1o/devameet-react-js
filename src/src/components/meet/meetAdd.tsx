import { MeetAddEditHeader } from "./MeetAddEditHeader"
import trashIcon from "../../../assets/images/trash-object.svg"
import rotateRight from "../../../assets/images/rotate-right.svg"
import rotateLeft from "../../../assets/images/rotate-left.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MeetServices } from "../../../services/meetServices"

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
            <div className="containerGrid">

                <div className="center">
                         <div className="grid">
                            <div className="line row one"/>
                            <div className="line row two"/>
                            <div className="line row three"/>
                            <div className="line row four"/>
                            <div className="line row five"/>
                            <div className="line row six"/>
                            <div className="line row seven"/>

                            <div className="line column one"/>
                            <div className="line column two"/>
                            <div className="line column three"/>
                            <div className="line column four"/>
                            <div className="line column five"/>
                            <div className="line column six"/>
                            <div className="line column seven"/>
                        </div>
                        <div className="actions">
                            <div>
                                <img src={trashIcon} alt="" />
                            </div>
                            <div>
                                <img src={rotateRight} alt="" />
                            </div>
                            <div>
                                <img src={rotateLeft} alt="" />
                            </div>
                        </div>
                </div>
             
            </div>
        </div>
    )
}