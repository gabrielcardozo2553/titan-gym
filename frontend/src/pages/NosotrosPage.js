import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import PageHero from '../components/layout/PageHero';
import '../styles/pages/NosotrosPage.css';

const hitos = [
    { anio: '2018', titulo: 'Nace Atletic Gym', texto: 'Abrimos con una sala de musculación y cinco socios que confiaron en el proyecto.' },
    { anio: '2020', titulo: 'Llegan las clases grupales', texto: 'Sumamos funcional, HIIT y yoga para entrenar en equipo.' },
    { anio: '2023', titulo: 'Crecemos y sumamos nutrición', texto: 'Ampliamos la sala e incorporamos asesoramiento nutricional personalizado.' },
    { anio: '2026', titulo: 'Una comunidad de más de 400 socios', texto: 'Hoy entrenamos todos los días con un equipo de profesionales.' }
];

const valores = [
    { numero: 'I', titulo: 'Disciplina', texto: 'Los resultados se construyen con constancia, un entrenamiento por vez.' },
    { numero: 'II', titulo: 'Superación', texto: 'Cada socio compite contra su versión de ayer, sin importar su nivel.' },
    { numero: 'III', titulo: 'Comunidad', texto: 'Entrenamos acompañados: el grupo te empuja cuando el cuerpo dice basta.' }
];

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
            <PageHero
                etiqueta="Quiénes somos"
                titulo="Forjados en el esfuerzo"
                subtitulo="Un gimnasio hecho por y para quienes entrenan en serio."
            />

            <main className="holder nosotros">
                {/* Números del gimnasio */}
                <section className="cifras">
                    <div><strong>2018</strong><span>Año de fundación</span></div>
                    <div><strong>+400</strong><span>Socios activos</span></div>
                    <div><strong>{entrenadores.length || 5}</strong><span>Profesionales</span></div>
                    <div><strong>6</strong><span>Días de atención</span></div>
                </section>

                {/* Historia en línea de tiempo */}
                <section className="historia">
                    <h2>Nuestra historia</h2>
                    <ol className="linea-tiempo">
                        {hitos.map(h => (
                            <li key={h.anio}>
                                <span className="anio">{h.anio}</span>
                                <div>
                                    <h3>{h.titulo}</h3>
                                    <p>{h.texto}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Valores */}
                <section className="valores">
                    <h2>Lo que nos define</h2>
                    <div className="valores-grid">
                        {valores.map(v => (
                            <article key={v.titulo}>
                                <span className="numero">{v.numero}</span>
                                <h3>{v.titulo}</h3>
                                <p>{v.texto}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Equipo (datos desde la base) */}
                <section className="staff">
                    <h2>Nuestro equipo</h2>
                    {error && <p className="aviso">No pudimos cargar el equipo en este momento.</p>}
                    <div className="personas">
                        {entrenadores.map(e => (
                            <article className="persona" key={e.id}>
                                <div className="foto">
                                    <img src={e.foto} alt={e.nombre} />
                                </div>
                                <div className="datos-persona">
                                    <span className="especialidad">{e.especialidad}</span>
                                    <h3>{e.nombre}</h3>
                                    <h4>{e.cargo}</h4>
                                    <p>{e.bio}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="cta-banda">
                    <div>
                        <h2>Probá tu primera clase sin costo</h2>
                        <p>Vení a conocernos y elegí cómo querés empezar.</p>
                    </div>
                    <Link to="/contacto" className="btn-cta">Reservar clase →</Link>
                </section>
            </main>
        </>
    );
}

export default NosotrosPage;
