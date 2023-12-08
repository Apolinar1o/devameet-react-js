import { Footer } from "../src/components/general/Footer"
import { Header } from "../src/components/general/header"
import { ActionHeader } from "../src/components/general/ActionHeader"
import { AvatarInput } from "../src/components/general/avatarInput"
import { useContext, useState } from "react"
import clearIcon from "../assets/images/clear.svg"
import logoutIcon from "../assets/images/logout.svg"
import { LoginServices } from "../services/loginService"
import { useNavigate } from "react-router-dom"
import { AuthorizeContext } from "../App"
import { UserServices } from "../services/userServices"



const loginServices = new LoginServices()
const userServices = new UserServices()
export const Profile = () => {

    const navigate = useNavigate()
    const {setToken} = useContext(AuthorizeContext)
    const [name, setName] = useState(localStorage.getItem("name") || "")
    const [image, setImage] = useState(localStorage.getItem("avatar") || "")
    
    const logout = () => {
        loginServices.logout(setToken);
        navigate('/')
    }
    const mobile = window.innerWidth <= 992

    const finishUpadte = async () => {

        try {
            if(!name || name.trim().length < 2) {
                return
             }
    
             const body =  {name } as any;
    
             if(image) {
                body.avatar = image
             }
    
             await userServices.update(body)

             localStorage.setItem("name", name)

             if(image) {
                localStorage.setItem("avatar", image)
             }
    
            return navigate(-1)
        } catch (e:any) {

            if(e?.response?.data?.message) {
                console.log("ocorreu um erro ao atualizar dados do usuario: " + e.response.data.message)
            } else [
                console.log("ocorreu erro ao atualizar dados do usuario")
            ]
            
        }
        
    }

    return(
    
        <> 
        {!mobile && <Header/>}

        <div className="container-profile">
            <ActionHeader actionCallBack={finishUpadte} disabled={!name}/>
            <AvatarInput image={image} setImage={setImage} />
            <div className="input">
                <div>
                    <span>Nome</span>
                    <input type="text" placeholder="informe seu nome" value={name} onChange={e=> setName(e.target.value)}/>
                    { name && <img src={clearIcon} alt="Limpar" onClick={() => setName("")} />}
                </div>
            </div>
            <div className="logout">
                <div onClick={logout} >
                    <img src={logoutIcon} alt="sair" />
                    <span>sair</span>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
    
}