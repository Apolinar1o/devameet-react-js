import { useState } from "react"
import { MeetAddEditHeader } from "./MeetAddEditHeader"
import { MeetObjetctPicker } from "./MeetObjectPicker"
import wallIcon from "../../../assets/images/wall.svg";
import floorIcon from "../../../assets/images/floor.svg";
import rugIcon from "../../../assets/images/rug.svg";
import chairIcon from "../../../assets/images/chair.svg";
import counchIcon from "../../../assets/images/couch.svg";
import decorIcon from "../../../assets/images/decor.svg";
import natureIcon from "../../../assets/images/nature.svg";
import tableIcon from "../../../assets/images/table.svg";
import objectsJson from "../../../assets/objects/objects.json"

export const MeetEdit= () => {

    const [name,setName ] = useState("")  
    const [color,setColor] = useState("")
    const [selected,setSelected] = useState("")

    const isFormInvalid = true
    
    return (
        <div className="container-principal">
                    <div className="container-meet">
                <div className="scroll">
                    <MeetAddEditHeader name={name} setName={setName} color={color} setColor={setColor} isEdit={true}/>
                    <MeetObjetctPicker image={wallIcon} label="paredes" asset={objectsJson.wall} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={floorIcon} label="pisos" asset={objectsJson.floor}selected={selected} setObject={setSelected} />
                    <MeetObjetctPicker image={rugIcon} label="tapetes" asset={objectsJson.rug} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={tableIcon} label="mesa" asset={objectsJson.table} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={chairIcon} label="cadeiras" asset={objectsJson.chair} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={counchIcon} label="sofas" asset={objectsJson.couch} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={decorIcon} label="decorações" asset={objectsJson.decor} selected={selected} setObject={setSelected}/>
                    <MeetObjetctPicker image={natureIcon} label="naturezas" asset={objectsJson.nature} selected={selected} setObject={setSelected}/>
                </div>
                <div className="actions">
                    <span>voltar</span>
                    <button  disabled={isFormInvalid} className={isFormInvalid ?"disabled": ""}>salvar</button>
                    </div>
            </div>
        </div>
  
    )
}