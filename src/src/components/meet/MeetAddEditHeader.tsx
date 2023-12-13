import React, { useState } from "react"
import arrowIcon from "../../../assets/images/arrowDowncolor.svg"
import { Modal } from "react-bootstrap"

type MeetAddEditHeaderProps = {
    name: string,
    setName(s:string):any,
    color: string,
    setColor(s:string):any,
    isEdit: boolean
}

export const MeetAddEditHeader: React.FC<MeetAddEditHeaderProps>  = ({name, color, setColor, setName, isEdit}) => {

    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState("")

    const colors = [
        "#3BD42D",
        "#B0A4FF",
        "#5E49FF",
        "#25CBD3",
        "#5E53F5",
        "#1F2C33",

    ]

    const cancelSelection = () => {
        setSelected("")
        setShowModal(false)
    }
    const selectColor = () => {
        if(selected) {
            setColor(selected)
        }
        setShowModal(false)
    }

    

    return(

        <>
            <div className="container-userHeader">
                <span>{isEdit? "" : "Nova reunião"}</span>
                <div>
                        <input type="text"  placeholder="Digite o nome da sua reunião" value={name} onChange={e => setName(e.target.value)}/>
                        <div className="colorSelect" onClick={() => setShowModal(true)}>
                            <div className="circle" style={color ? {backgroundColor : color} : {}}/>
                                <img src={arrowIcon} alt="selecionar cor" />
                        </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
            <Modal.Body>

                <div className="content">
                        <div className="container">
                            <span>Selecione a cor da reunião:</span>
                              <div className="colors">
                            {colors?.map(c => <div className={c === selected ? "selected" : ""} style={{backgroundColor: c}} onClick={() => setSelected(c) }/>)}
                            
                            </div>
                        </div>
                      
                        <div className="actions">
                            <span onClick={cancelSelection}>cancelar</span>
                            <button onClick={selectColor}>Confirmar</button>
                        </div>
                </div>
            </Modal.Body>

         </Modal>
        </>
       
    )
}