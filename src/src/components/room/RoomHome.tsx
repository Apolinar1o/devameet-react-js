import { useEffect, useState } from "react"
import emptyIcon from "../../../assets/images/emptyList.svg"
import copyIcon from "../../../assets/images/copy.svg"
import iconUp from "../../../assets/images/chevronUp.svg"
import iconDown from "../../../assets/images/chevron-dow.svg"
import iconLeft from "../../../assets/images/chevron-left.svg"
import iconRight from "../../../assets/images/chevron-right.svg"

import { useNavigate, useParams } from "react-router-dom"
import { RoomObjects } from "./roomObjects"
import { RoomServices } from "../../../services/RoomService"
import { createPeerConnectionContext } from "../../../services/webSocketServices"
import { Socket } from "socket.io-client"
import { Modal } from "react-bootstrap"

const roomServices = new RoomServices()
const  wsServices = createPeerConnectionContext()

export const RoomHome = () => { 

    const [objects, setObjects] = useState([])
    const [connectedusers, setconnectedusers] = useState([])
    const [me, setMe] = useState<any>([])
    const [color, setColor] = useState("")
    const [name, setName] = useState("")
    const [showModal, setShowModal] = useState(false)
    const { link } = useParams()
    const userId = localStorage.getItem("id") || ""
    const navigate = useNavigate()
    const mobile = window.innerWidth <= 992
    let userMediaStream: any;


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

            userMediaStream = await navigator?.mediaDevices?.getUserMedia({
                video: { 
                    width: {min: 640, ideal: 1200},
                    height: {min: 400, ideal: 1080},
                    aspectRatio: {ideal: 1.77777}

                }, 
                audio : true
            })

            if(document.getElementById("localVideoRef")) {
                const videoRef: any = document.getElementById("localVideoRef")
                videoRef.srcObject = userMediaStream
            }

        } catch (error) {
            console.log("Ocorreu ao buscar dados da sala: ", error)
        }
    }

    useEffect(() => {
        getRoom();
    }, [])

    useEffect(() => {
       document.addEventListener("keyup", (event:any) => doMovement(event))

       return () => {
        document.removeEventListener("keyup", (event:any) => doMovement(event))
       }
    }, [])


    const enterRoom = () => {

        if(userMediaStream) {
            return setShowModal(true)
        }   


        if(!link || !userId) {
            return navigate('/')
        } 
        wsServices.joinRoom(link, userId)
        wsServices.onCallMade()
        wsServices.onUpdateUserList(async(users: any) => {
            if(users) {
                setconnectedusers(users)
                localStorage.setItem("connectedusers", JSON.stringify(users))

                const me = users.find((u: any) => u.user === userId)
                if(me) {
                    setMe(me)
                    localStorage.setItem("me", JSON.stringify(me))
                }
                const usersWithoutMe =  users?.filter((u:any) => u.user !== userId)
                for(const user of usersWithoutMe) {
                    wsServices.addPeerConnection(user.clientId, userMediaStream, (_stream: any) => {
                        if(document.getElementById(user.clientId)) {
                            const videoRef: any = document.getElementById(user.clientId)
                            videoRef.srcObejct = _stream
                        }
                    })
                 
                }
            }
        })

        wsServices.onRemoveUser((socketId: any) => {
           const connectedStr = localStorage.getItem("connectedusers") || ""
           const connectedUsers = JSON.parse(connectedStr)
           const filtered = connectedUsers?.filter((u:any) => u.clientId !== socketId)
           setconnectedusers(filtered)
           wsServices.removePeerConnection(socketId)
        })
        
        wsServices.onAddUser((user:any) => {
            console.log("onAddUser: ", user)

            wsServices.addPeerConnection(user, userMediaStream, (_stream: any) => {
                if(document.getElementById(user)) {
                    const videoRef: any = document.getElementById(user)
                    videoRef.srcObejct = _stream
                }
            })
        
            wsServices.callUser(user)

        })  
        wsServices.onAnswerMade((socket:any) => wsServices.callUser(socket))
    }
    const toggleMute  = () => {

        const payload =  {
            userId,
            link, 
            muted: !me.muted
        }
        wsServices.updateUserMute(payload)
      

    }

    const doMovement = (event:any) => {
        const metStr = localStorage.getItem("me") || ""
        const user = JSON.parse(metStr)

        if(event && user) {
            
        const payload =  {
            userId,
            link
        } as any;

            switch(event.key) {
                case "ArrowUp":
                payload.x = user.x
                payload.orientation = "back"
                if(user.orientation === "back") {
                    payload.y = user.y > 1 ? user.y - 1 : 1
                } else {
                    payload.y = user.y;
                }
                break;
                case "ArrowDown":
                    payload.x = user.x
                    payload.orientation = "front"
                    if(user.orientation === "front") {
                        payload.y = user.y < 7 ? user.y + 1 : 7
                    } else {
                        payload.y = user.y;
                    }
                    break;
                case "ArrowLeft":
                    payload.y = user.y
                    payload.orientation = "left"
                    if(user.orientation === "left") {
                        payload.x = user.x > 0  ? user.x - 1 : 0
                    } else {
                        payload.x = user.x;
                    }
                    break;
                case "ArrowRight":
                    payload.y = user.y
                    payload.orientation = "right"
                    if(user.orientation === "right") {
                        payload.x = user.x < 7  ? user.x + 1 : 7
                    } else {
                        payload.x = user.x;
                    }
                    break;
                default: break;
            }
            if(payload.x >= 0 && payload.y >=0 && payload.orientation) {
                wsServices.updateUserMovement(payload)
            }
        }

    }

    const copyLink = () => { 
        navigator.clipboard.writeText(window.location.href)
    }

    const getUserWithOutMe = () => { 
        return connectedusers.filter((u: any) => u.user !== userId )
    }
    return (
        <>
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
                        <audio id="localVideoRef" playsInline autoPlay muted/>
                        {getUserWithOutMe()?.map((user:any) => 
                            <audio key={user.clientId} id={user.clientId}  playsInline autoPlay muted={user?.muted}/>
                        )}
                    </div>
                    <RoomObjects 
                    objects={objects} 
                    enterRoom={enterRoom}
                    connectedUser={connectedusers}
                    me={me}
                    toggleMute={toggleMute}
                    />
                    {mobile && me?.user &&
                    <div className="movement">
                        <div className="button" onClick={() => doMovement({key: "ArrowUp"})}> 
                            <img src={iconUp} alt="andar para cima" />
                        </div>
                        <div className="line">
                        <div className="button" onClick={() => doMovement({key: "ArrowLeft"})}> 
                            <img src={iconLeft} alt="andar para esquerda" />
                        </div>
                        <div className="button" onClick={() => doMovement({key: "ArrowDown"})}> 
                            <img src={iconDown} alt="andar para baixo" />
                        </div>
                        <div className="button" onClick={() => doMovement({key: "ArrowRight"})}> 
                            <img src={iconRight} alt="andar para direito" />
                        </div>
                        </div>

                    </div> }
                 </>
                    :
                    <div className="empty">
                        <img src={emptyIcon} alt="" />
                        <p>Reunião não encontrada</p>
                  </div>
              }
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} className="container-modal">
            <Modal.Body>

                <div className="content">
                        <div className="container">
                            <span>Aviso</span>
                            <p>habilite a permissão de audio e video para participar das reuniões:</p>
                      
                        </div>
                      
                        <div className="actions">
=                            <button onClick={() => setShowModal(false)}>Ok</button>
                        </div>
                </div>
            </Modal.Body>

         </Modal>


        </>
      
    )
    }