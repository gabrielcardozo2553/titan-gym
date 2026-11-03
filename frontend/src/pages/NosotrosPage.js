import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Banner from '../components/layout/Banner';
import '../styles/pages/NosotrosPage.css';

const NosotrosPage = () => {
    const [entrenadores, setEntrenadores] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/entrenadores`)
            .then(response => setEntrenadores(response.data))
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }, []);

    return (
        <>
        <Banner imagen="/images/banners/nosotros.svg" alt="Equipo de Atletic Gym" />
        <main className="holder">
            <div className="historia">
                <h2>Nuestra historia</h2>
                <p>Atletic Gym nació en 2018 con una idea simple: un lugar donde cualquier persona,
                    sin importar su nivel, pueda entrenar con buena guía y buen ambiente.</p>
                <p>Empezamos con una sala chica y cinco socios. Hoy somos una comunidad de más de
                    400 personas que comparten la misma meta: moverse mejor, sentirse fuertes y
                    disfrutar del proceso.</p>
            </div>

            <div className="staff">
                <h2>Nuestro equipo</h2>
                {error && <p className="aviso">No pudimos cargar el equipo en este momento.</p>}
                <div className="personas">
                    {entrenadores.map(e => (
                        <div className="persona" key={e.id}>
                            <img src={e.foto} alt={e.nombre} />
                            <h5>{e.nombre}</h5>
                            <h6>{e.cargo}</h6>
                            <span className="especialidad">{e.especialidad}</span>
                            <p>{e.bio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}

export default NosotrosPage;
