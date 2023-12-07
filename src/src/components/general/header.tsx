
import logo from "../../../assets/images/logo.svg"
import home from "../../../assets/images/home.svg"
import homeActive from "../../../assets/images/home-active.svg"
import linkActive from "../../../assets/images/link-active.svg"
import linkIcon from "../../../assets/images/link.svg"
import avatarIcon from "../../../assets/images/avatar.svg"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
export const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="container-header">
                <img src={logo} alt="logo Devameet"  className="logo"/>

                <div className="navigation">
                    <ul>
                        <li>
                            <img src={getIcon("home")} alt="minhas reuniões" className="iconeNav" onClick={() => navigate("/")}/>
                        </li>
                        <li>
                            <img src={getIcon("room")} alt="Entrar na reunião" className="iconeNav"onClick={() => navigate("/link")} />
                        </li>
                        <li>
                            <div className={'avatar mini ' + getSelectedClass()}>
                                <img src={avatarIcon} alt="Editar usuario"onClick={() => navigate("/user")} />
                            </div>
                        </li>
                    </ul>
                </div>
        </div>
    )
} 
