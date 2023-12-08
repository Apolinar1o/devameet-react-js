import home from "../../assets/images/home.svg"
import homeActive from "../../assets/images/home-active.svg"
import linkActive from "../../assets/images/link-active.svg"
import linkIcon from "../../assets/images/link.svg"
import avatarIcon from "../../assets/images/avatar.svg"
import {useLocation, useNavigate } from "react-router-dom"


export const Navigation = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const mobile = window.innerWidth <= 992

    const avatarImage = () => {
        const avatar = localStorage.getItem("avatar");
        if(avatar) {
            const path = `../../assets/objects/avatar/${avatar}_front.png`
            console.log(path + " asdasdasd")
            const imageUrl = new URL(path, import.meta.url)
            return imageUrl.href;
        }
        return avatarIcon;
    }
     

    const getIcon = (name: string) => {
        switch(name) {
            case "home":
                if(location.pathname !== "/user" && 
                    location.pathname !== "/link" &&
                    location.pathname !== "/room"
                    ) {
                    return homeActive
                }
                return home

            case "room":
                if(location.pathname === "/room" || 
                    location.pathname === "/link") {
                    return linkActive
                }
                return linkIcon
            default:
                return ""
    }   
    }
    const getSelectedClass = () => {
        if(location.pathname === "/user") {
            return "selected"
        }
        return ""
}


    return (
        <div className="container-navigation">
                    <ul>

                        <li>
                            <img src={getIcon("home")} alt="minhas reuniões" className="iconeNav" onClick={() => navigate("/")}/>
                        </li>


                        {mobile ? 
                            <li>
                                <img src={getIcon("room")} alt="Entrar na reunião" className="iconeNav" onClick={() => navigate("/link")} />
                            </li>
                        : 
                            <li className="disabled">
                                    <img src={getIcon("room")} alt="Entrar na reunião" className="iconeNav" />
                            </li>
                        }
                    
                        <li>
                            <div className={'avatar mini ' + getSelectedClass()}>
                                <img src={avatarImage()} alt="Editar usuario"onClick={() => navigate("/user")} />
                            </div>
                        </li>
                    </ul>
                </div>
    )
}