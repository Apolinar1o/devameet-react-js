import { useNavigate } from "react-router-dom"


type actionHeaderProps = {
    actionCallBack():void
    disabled: boolean
}

export const ActionHeader: React.FC<actionHeaderProps>= ({actionCallBack, disabled}) => {
    
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1);
    }
    
    return (
        <div className="container-actionHeader">
            <span onClick={goBack}>Cancelar</span>
            <strong>Editar perfil</strong>
            {disabled ? <span className="disabled">Concluir</span> : <span className="principal" onClick={actionCallBack}>Concluir</span>}
        </div>
    )
}