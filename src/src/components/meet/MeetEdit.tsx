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
import { MeetObjectsRoom } from "./meetObjectsRoom";

export const MeetEdit= () => {

    const [index, setIndex] = useState(0)
    const [name,setName ] = useState("")  
    const [color,setColor] = useState("")
    const [selected,setSelected] = useState<any>({})
    const [objects,setObjects] = useState<any>([])

    const isFormInvalid = true
    
    const setObject = (object:any) => {
        const newIndex = index+1;
        object._id = newIndex;
        setIndex(newIndex);

        if(object.selectMultiple === true) {
            const newArray = [...objects, object]
            setObjects(newArray)
        } else {
            const filtered = objects.filter((o:any) => o.type !== object.type)
            filtered.push(object)
            setObjects(filtered)
        }
        setSelected(object)
    }

    const removeObject = (object: any) => {
        const filtered = objects.filter((o:any) => o._id !== object._id)
        setObjects(filtered)
        setSelected(null)
    }
    return (
        <div className="container-principal">
                    <div className="container-meet">
                <div className="scroll">
                    <MeetAddEditHeader name={name} setName={setName} color={color} setColor={setColor} isEdit={true}/>
                    <MeetObjetctPicker image={wallIcon} label="paredes" asset={objectsJson.wall} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={floorIcon} label="pisos" asset={objectsJson.floor}selected={selected?.name} setObject={setObject} />
                    <MeetObjetctPicker image={rugIcon} label="tapetes" asset={objectsJson.rug} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={tableIcon} label="mesa" asset={objectsJson.table} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={chairIcon} label="cadeiras" asset={objectsJson.chair} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={counchIcon} label="sofas" asset={objectsJson.couch} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={decorIcon} label="decorações" asset={objectsJson.decor} selected={selected?.name} setObject={setObject}/>
                    <MeetObjetctPicker image={natureIcon} label="naturezas" asset={objectsJson.nature} selected={selected?.name} setObject={setObject}/>
                </div>
                <div className="actions">
                    <span>voltar</span>
                    <button  disabled={isFormInvalid} className={isFormInvalid ?"disabled": ""}>salvar</button>
                    </div>
            </div>
            <MeetObjectsRoom objects={objects} selected={selected} setSelected={setSelected} removeObject={removeObject}/>
        </div>
  
    )
}