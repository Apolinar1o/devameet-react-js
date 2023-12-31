
import logo from "../assets/images/logo.svg"
import loginIcon from "../assets//images/mail.svg"
import keyIcon from "../assets//images/key.svg"
import {PublicInput}  from "../src/components/general/publicInput"
import {useContext, useState} from "react"
import { LoginServices } from "../services/loginService"
import {Link, useSearchParams} from "react-router-dom"
import { AuthorizeContext } from "../App"
const loginServices = new LoginServices()

export const Login = () => {

  const [login, setLogin] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [seacbParamns] = useSearchParams();
  const success = seacbParamns.get("success")
  const {setToken} = useContext(AuthorizeContext)

  const doLogin = async() => {
       try {
        setError("")

        if(!login  || login.trim().length < 5 || !senha || senha.trim().length < 4  ) {
          return setError("favor preencher os campos corretamente")
        } 
        
        setLoading(true)
        await loginServices.login({login, senha}, setToken)
        setLoading(false)

       } catch (e:any) {
          console.log("eeror ao efetuar Login", e)
          setLoading(false)
          if(e?.response?.data?.message) {
            return setError(e?.response?.data?.message)
          }

          return setError("Erro ao efetuar login, tente novaemnte")
       }
  }

  return (
      <div className="container-public">
          <img src={logo} alt="logo devameet" className="logo" />
          <form >
              {error && <p className="error">{error}</p> }
              {success && <p className="success">Cadastro efetuado com sucesso, faça seu login</p> }


              <PublicInput icon={loginIcon} alt="email" 
              name="email" 
              type="text" 
              modelValue={login} 
              setValue={setLogin}/>
              

              <PublicInput icon={keyIcon} alt="senha" 
              name="Senha" 
              type="password" 
              modelValue={senha} 
              setValue={setSenha}
              />


              <button type="button" onClick={doLogin} disabled={loading}>{loading ? "...Carregando" : "Login"}</button>
              
              <div className="link">
                <p>Não possui uma conta?</p>
                <Link to="/register">Faça seu cadastro agora!!</Link>
              </div>
          </form>
      </div>  
    )

}



