import { Footer } from "../src/components/general/Footer"
import { Header } from "../src/components/general/header"
import { ActionHeader } from "../src/components/general/ActionHeader"
import { AvatarInput } from "../src/components/general/avatarInput"
import { useState } from "react"
import clearIcon from "../assets/images/clear.svg"
import logoutIcon from "../assets/images/logout.svg"


export const Profile = () => {

    const [image, setImage] = useState('')

    const mobile = window.innerWidth <= 992
    return(
    
        <> 
        {!mobile && <Header/>}

      

        <div className="container-profile">
            <ActionHeader/>
            <AvatarInput image={image} setImage={setImage} />
            <div className="input">
                <div>
                    <span>Nome</span>
                    <input type="text" placeholder="informe seu nome"/>
                    <img src={clearIcon} alt="Limpar" />
                </div>
            </div>
            <div className="logout">
                <div>
                    <img src={logoutIcon} alt="sair" />
                    <span>sair</span>
                </div>
            </div>
        </div>

        <Footer/>
        </>
    )
    
}