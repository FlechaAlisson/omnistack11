import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'


import './styles.css'
import heroesImage from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import api from '../../services/api'



export default function Logon() {

    const [id, setID] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('session', {id})
            localStorage.setItem('ongID', id)
            localStorage.setItem('ongName', response.data.nome)
            history.push('/profile')


        } catch (err) {
            alert('ONG não encontrada.')
        }
    }

    return (
       <div className="logon-container">
           <section className="form">
                <img src={ logo } alt = "logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder = "Sua ID"
                        value={id}
                        onChange={e => setID(e.target.value)}
                    />
                    <button className = "button" type="submit">Entrar</button>
                    <Link className = "back-link" to="/register"> 
                        <FiLogIn size = {16} color="#E02041"  />
                        Não tenho cadastro
                    </Link>
                </form>
           </section>
           <img src= {heroesImage} alt = "heroes"/>
       </div>
    );
    
}