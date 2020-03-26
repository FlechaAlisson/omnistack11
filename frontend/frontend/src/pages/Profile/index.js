import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import logo from '../../assets/logo.svg'
import './styles.css'
import api from '../../services/api'



export default function Profile() {

    const history = useHistory()
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName')
    const ongID = localStorage.getItem('ongID')
    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization: ongID
            }
        }).then(response => {
            setIncidents(response.data)
        })

    },[ongID])


    async function handleDeleteIncident(key) {
        try {
            await api.delete(`incidents/${key}`, {
                headers:{
                    Authorization: ongID
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== key)) //remove da lista
        } catch (error) {
            alert('erro ao deletar caso')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }
    
    return(
        <div className="profile-container">
            <header>
                <img src={ logo } alt = "logo"/>
                 <span>Bem vindo, {ongName}</span>
                
                <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18 } color= "#e02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                    
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                    
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}</p>
                    
                        <button onClick={() => handleDeleteIncident(incident.id)} type= "button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                
                ))}
            </ul>
        </div>
    )
}