import { useNavigate } from "react-router-dom";
import addIcon from "../../../assets/images/add.svg"

export const MeetHeader = () => {

        
    const navigate = useNavigate();
    const mobile = window.innerWidth <= 992;
    const name = localStorage.getItem("name" || "");

    const navigateToadd = () =>  {
        navigate("/add")
    }
    
    return(
        <div className="container-userHeader">
            <span>Minhas reuniões</span>
            <div>
                <p>Olá, {name}</p>
                  { !mobile && <img src={addIcon} alt="Adicionar reuni
                    ão" onClick={navigateToadd}/>}
            </div>
        </div>
    )
}