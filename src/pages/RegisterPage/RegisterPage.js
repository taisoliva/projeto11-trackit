import { RegisterContainer, Register } from "./styled"
import { Input, Button } from "../styledCommon"
import Logo from "../../assets/logo-completa.svg"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_CADASTRO } from "../Urls"
import { ThreeDots } from "react-loader-spinner"


export default function RegisterPage() {

    const [form, setForm] = useState({ email: "", password: "", name: "", image: "" })
    const navigate = useNavigate()
    const [disabledButton, setDisabledButton] = useState(false)


    function handleForm(event) {
        console.log(event.target.name)
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    function RegisterUser(event) {
        event.preventDefault()
        setDisabledButton(true)
        const body = { ...form }

        const promisse = axios.post(URL_CADASTRO, body)
        promisse.then(resposta => navigate("/"))
        promisse.catch(err => { alert(err.response.data.message); setDisabledButton(false) })

    }

    return (


        <RegisterContainer>
            <form onSubmit={RegisterUser}>
                <Register>
                    <img src={Logo} alt={Logo} />

                    <Input
                        type="email"
                        placeholder="email"
                        name={"email"}
                        value={form.email}
                        disabled={disabledButton}
                        onChange={handleForm} />

                    <Input
                        type="password"
                        placeholder="senha"
                        name={"password"}
                        disabled={disabledButton}
                        value={form.password}
                        onChange={handleForm}

                    />
                    <Input
                        type="text"
                        placeholder="nome"
                        name={"name"}
                        disabled={disabledButton}
                        value={form.name}
                        onChange={handleForm}

                    />
                    <Input
                        type="text"
                        placeholder="foto"
                        name={"image"}
                        disabled={disabledButton}
                        value={form.image}
                        onChange={handleForm}
                    />
                    <Button type="submit">
                        {disabledButton ? <ThreeDots color="#FFFFFF" height={80} width={80} timeout={3000} // 3 secs 
                        /> : "Cadastrar"
                        }

                    </Button>
                    <Link to={"/"}> Já tem uma conta? Faça login!</Link>
                </Register>
            </form>

        </RegisterContainer>
    )
}