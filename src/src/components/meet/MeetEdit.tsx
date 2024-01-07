import { useEffect, useState } from "react"
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
import { useNavigate, useParams } from "react-router-dom";
import { MeetServices } from "../../../services/meetServices";

const meetservices = new MeetServices();

export const MeetEdit= () => {

    const [index, setIndex] = useState(0)
    const [id, setId] = useState("")
    const [name,setName ] = useState("")  
    const [color,setColor] = useState("")
    const [selected,setSelected] = useState<any>({})
    const [objects,setObjects] = useState<any>([])

    const isFormInvalid = (!id || !id.trim().length || id.trim().length < 5 || !name  || name.trim().length < 5 || !color || color.trim().length < 4 )
    const navigate = useNavigate()
    
    const {meetId} = useParams()
    const getMeet = async () => {
        if(!meetId) {
           return navigate("/")
        }

        const result = await meetservices.getMeetById(meetId)

        if(!result?.data) {
            return navigate("/")
        }

        const {_id, name, color} = result.data
      
        setName(name)
        setColor(color)
        setId(_id)

        const objectsResult = await meetservices.getMeetObjects(meetId);

        if (objectsResult?.data) {
            const newObjects = objectsResult?.data?.map((e: any) => {
                return { ...e, type: e?.name?.split('_')[0] }
            });
            setObjects(newObjects);
        }

    }
    
    useEffect(() => {
        getMeet()
    }, [])
    
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

    const rotateObject = (object: any, to: string) => {

        if(object?._id && (object?.type === "chair" || object?.type === "couch") ? "active" : "") {
            const index = objects?.indexOf(object)
                if(to === "left") {
                    switch(object.orientation) {
                        case "front":
                            object.orientation = "right"
                        break;
                        case "right":
                            object.orientation = "back";
                            break;
                        case "left":
                            object.orientation = "front";
                            break;
                        case "back":
                            object.orientation = "left";
                            break;
                        
                        default: break;
                    }

                } else if (to === "right") {
                    switch(object.orientation) {
                        case "front":
                            object.orientation = "left"
                        break;
                        case "right":
                            object.orientation = "front";
                            break;
                        case "left":
                            object.orientation = "back";
                            break;
                        case "back":
                            object.orientation = "right";
                            break;
                        
                        default: break;
                    }
                } 

                setSelected(object)
                object[index] = object;
                const newArray = [...objects];
                setObjects(newArray)
        }
     
    }

   const moveSelected = (event: any, selected: any) => {

           if(selected && selected._id && selected.type !== "wall" && selected.type !== "floor") {
                const index = objects?.indexOf(selected)
            

                switch(event?.key) {
                    case "ArrowUp":
                        selected.y = selected.y > 1 ? selected.y - 1 : 1;
                        break;
                    case "ArrowDown":
                        selected.y = selected.y < 7 ? selected.y + 1 : 7;
                        break;
                    case "ArrowLeft":
                        selected.x = selected.x > 0 ? selected.x - 1 : 0;
                        break;
                    case "ArrowRight":
                        selected.x = selected.x < 7 ? selected.x + 1 : 7;
                        break;
        
                    default: break;
                   }


                   setSelected(selected)
                   objects[index] = selected;
                   const newArray = [...objects];
                   setObjects(newArray)
           }    

         
        }   
    
    const goBack = () => {
            return navigate(-1)
        }
           
    const doUpdate = async () => {
            try {    
                if( isFormInvalid) {
                  return 
                } 
                
                const body = {
                    name, 
                    color, 
                    objects
                }
                console.log("body: ", body)
                await meetservices.updateMeet(body, id)
                return navigate("/");
        
               } catch (e:any) {
                
                  if(e?.response?.data?.message) {
                    console.log("Error ao efetuar update: ", e)
                  } else {
                    console.log("Error ao efetuar update")
                  }
                
               }
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
                    <span onClick={goBack}>voltar</span>
                    <button  onClick={doUpdate}  disabled={isFormInvalid} className={isFormInvalid ?"disabled": ""}>salvar</button>
                    </div>
            </div>
            <MeetObjectsRoom objects={objects} selected={selected} moveSelected={moveSelected} rotateObject={rotateObject} setSelected={setSelected} removeObject={removeObject}/>
        </div>
  
    )
}