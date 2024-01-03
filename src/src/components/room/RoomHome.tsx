import { useEffect, useState } from "react"
import emptyIcon from "../../../assets/images/emptyList.svg"
import copyIcon from "../../../assets/images/copy.svg"
import { useNavigate, useParams } from "react-router-dom"
import { RoomObjects } from "./roomObjects"
import { RoomServices } from "../../../services/RoomService"

const roomServices = new RoomServices()

export const RoomHome = () => { 

    const [objects, setObjects] = useState([])
    const [color, setColor] = useState("")
    const [name, setName] = useState("")
    const { link } = useParams()
    const navigate = useNavigate()


    const getRoom = async () => {
        try {
            if(!link) {
                return navigate("/")
            }
            
            const result = await roomServices.getRoomByLink(link)

            if(!result || !result.data) {
                return
            }

            const {color, name, objects} =  result.data
            
            setName(name)
            setColor(color)

            const newObjects = objects.map((o: any) => {
                return {...o, type: o?.name?.split('_')[0]}
            })
            setObjects(newObjects)
        } catch (error) {
            console.log("Ocorreu ao buscar dados da sala: ", error)
        }
    }

    useEffect(() => {
        getRoom();
    }, [])

    const enterRoom = () => {

    }

    const copyLink = () => [
        navigator.clipboard.writeText(window.location.href)
    ]

    return (
        <div className="container-principal">
          <div className="container-room">
              {
                objects?.length > 0
                    ? 
                    <>
                    <div className="resume">
                        <div onClick={copyLink}>
                            <span><strong>Reunião</strong> {link}</span>
                            <img src={copyIcon}  />
                        </div>
                        <p style={{color}}>{name}</p>
                    </div>
                    <RoomObjects objects={objects} enterRoom={enterRoom}/>
                 </>
                    :
                    <div className="empty">
                        <img src={emptyIcon} alt="" />
                        <p>Reunião não encontrada</p>
                  </div>
              }
          </div>
        </div>
    )
    }