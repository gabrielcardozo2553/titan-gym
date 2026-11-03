import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import HeroCarousel from '../components/home/HeroCarousel';
import ActividadesSelector from '../components/home/ActividadesSelector';
import '../styles/pages/HomePage.css';

const formatearPrecio = (valor) =>
    Number(valor).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

const HomePage = () => {
    const [planes, setPlanes] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/planes`)
            .then(response => setPlanes(response.data))
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }, []);

    return (
        <>
        <div className="holder">
            <HeroCarousel />
        </div>
        <main className="holder">
            <section className="bienvenidos">
                <h2>Bienvenidos</h2>
                <p>En Atletic Gym entrenás a tu ritmo, con profesores que te acompañan en cada serie.
                    Tenemos sala de musculación, zona funcional, clases grupales de HIIT y yoga,
                    y asesoramiento nutricional para que llegues a tus objetivos.</p>
                <p>Pasá por recepción y hacé tu primera clase de prueba sin costo.</p>
            </section>

            <section className="actividades" id="actividades">
                <h2>Qué podés entrenar</h2>
                <ActividadesSelector />
            </section>

            <section className="planes" id="planes">
                <h2>Nuestros planes</h2>
                {error && <p className="aviso">No pudimos cargar los planes en este momento.</p>}
                <div className="planes-grid">
                    {planes.map(plan => (
                        <article key={plan.id} className={`plan ${plan.destacado ? 'destacado' : ''}`}>
                            {plan.destacado ? <span className="etiqueta">Más elegido</span> : null}
                            <h3>{plan.nombre}</h3>
                            <p className="precio">{formatearPrecio(plan.precio)}<small> / mes</small></p>
                            <p>{plan.descripcion}</p>
                            <p className="dias">{plan.dias_por_semana} días por semana</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="testimonios">
                <h2>Lo que dicen nuestros socios</h2>
                <div className="testimonios-grid">
                    <div className="testimonio">
                        <span className="cita">“En tres meses recuperé fuerza y energía. El equipo es genial.”</span>
                        <span className="autor">Sofía M. · socia desde 2025</span>
                    </div>
                    <div className="testimonio">
                        <span className="cita">“Las clases de HIIT me cambiaron el día. Muy buen ambiente.”</span>
                        <span className="autor">Matías R. · socio desde 2024</span>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}

export default HomePage;
