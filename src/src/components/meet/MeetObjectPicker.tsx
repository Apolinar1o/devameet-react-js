import downIcon from "../../../assets/images/chevron-down.svg";
import upIcon from "../../../assets/images/chevron-up.svg";
import PlusCircleIcon from "../../../assets/images/plus-circle.svg";
import React, { useState } from "react";

type MeetObjetctPickerType = {
    image: string,
    label: string,
    asset:any,
    selected: string,
    setObject(s:string):any
}

export const MeetObjetctPicker: React.FC<MeetObjetctPickerType> = ({image, label, asset, selected, setObject}) => {

    const [show, setShow] = useState(false)

    const selectObject = (o: string) => {
            setObject(o)
    }

    const getImageFromObject = (object: string) => {
        if (object && object.trim().length > 0) {
            const path = `../../../assets/objects/${asset.path}/${object}${asset.canRotate ? "_front" : ""}.png`;
            const imageUrl = new URL(path, import.meta.url)
            return imageUrl.href
        }
    }
    return (
        <div className="container-ObjectPicker">
            <div className="action" onClick={() => setShow(!show)}>
                <img src={image} alt={label} />
                <span>{label}</span>
             { !show 
               ? 
             <img src={downIcon}/> 
             : 
             <img src={upIcon}/>}
            </div>
           {show && <div className="objects">
                {asset?.objects?.map((e:any) =>
                      <div className={e === selected ? "selected" : ""} onClick={() => selectObject(e)}>
                       
                    <img src={getImageFromObject(e)} alt="" className={"object " + (asset.path === "wall" || asset.path === "couch" ? "large" : "") }/>
                    <img src={PlusCircleIcon} className="add" alt="" />
                  </div>
                  ) }
            </div>}

        </div>
    )
}