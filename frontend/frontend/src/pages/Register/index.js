import React, {useState} from 'react';
import './styles.css'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import logo from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register(){
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUF] = useState('')

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault() //nao permite que a pagina recarregue

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf,
        }

        try{
            const response = await api.post('ongs', data)
            alert(`seu ID de acesso: ${response.data.id}`)
            history.push('/')
        }catch(err){
            alert('erro ao cadastrar.')
        }

    }



    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e ajude pessoa encontrarem casos da sua ONG.</p>
                    <Link className = "back-link" to="/"> 
                        <FiArrowLeft size = {16} color="#E02041"  />
                        Voltar
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder= "Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder= "Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder= "Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder= "UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                         />
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}