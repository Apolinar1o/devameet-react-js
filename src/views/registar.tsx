import logo from "../assets/images/logo.svg";
import user from "../assets/images/user.svg"
import emailIcon from "../assets/images/mail.svg"
import key from "../assets/images/key.svg"
import {PublicInput}  from "../src/components/general/publicInput"
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import { AvatarInput } from "../src/components/general/avatarInput";
import { RegisterServices } from "../services/RegisterService";


const registerServices = new RegisterServices();

export const Register = () => {
    const [senha, setSenha] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setNome] = useState("")
    const [image, setImage] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()
    const   doRegister = async () => {

        try {
            setError("")
    
            if(!image  || image.trim().length < 1 
            || !senha || senha.trim().length < 4  
            || !name || name.trim().length < 2  
            || !email || email.trim().length < 2  
            || !confirm || confirm.trim().length < 4 
            
            ) {
              return setError("favor preencher os campos corretamente")
            } 

            if(senha !== confirm) {
                return setError("Senha e confirmação não são iguais")
            }
            setLoading(true)

            const body = {
                name, 
                email, 
                senha, 
                avatar: image
            }

            await registerServices.register(body)

            setLoading(false)
            
            return navigate("/?success=true")

           } catch (e:any) {
              console.log("eeror ao efetuar Cadastro", e)
              setLoading(false)
              if(e?.response?.data?.message) {
                return setError(e?.response?.data?.message)
              }
    
              return setError("Erro ao efetuar login, tente novaemnte")
           }
    }

    return (
        <div className="container-public register">
            <img src={logo} className="logo" alt="logo devameet" />
            <form >
                <AvatarInput image={image} setImage={setImage} />

                {error && <p className="error">{error}</p>}

                <PublicInput icon={user} alt="icone usuario" name="nome"
                modelValue={name}
                type="text"
                setValue={setNome}/>

                <PublicInput icon={emailIcon} alt="icone email" name="email"
                modelValue={email}
                type="text"
                setValue={setEmail}/>

                <PublicInput icon={key} alt="icone senha"
                name="senha"
                modelValue={senha}
                type="password"
                setValue={setSenha}/>

                <PublicInput icon={key} alt="icone senha" name="Confirmação de senha"
                modelValue={confirm}
                type="password"
                setValue={setConfirm}/>

                <button disabled={loading} type="button" onClick={doRegister}> {loading ? "...Carregando" : "Cadastrar"} </button>

                <div>
                    <p>Ja possui uma conta?</p>
                    <Link to="/">Faça seu login agora!!</Link>

                </div>
            </form>
        </div> 

)
     
}
