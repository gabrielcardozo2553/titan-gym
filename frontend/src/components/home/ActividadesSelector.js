import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/home/ActividadesSelector.css';

// Las 4 actividades del gimnasio. Cada una tiene su ilustración y su descripción.
const actividades = [
    {
        id: 'musculacion',
        nombre: 'Musculación',
        categoria: 'Fuerza',
        nivel: 'Medio',
        imagen: '/images/actividades/musculacion.svg',
        texto: 'Sala equipada con máquinas y peso libre. Rutinas armadas por un profesor según tu objetivo: ganar fuerza, masa muscular o definición.',
        detalle: 'Para todo el mundo. Te enseñamos la técnica desde el primer día.'
    },
    {
        id: 'funcional',
        nombre: 'Funcional y HIIT',
        categoria: 'Cardio',
        nivel: 'Alto',
        imagen: '/images/actividades/funcional.svg',
        texto: 'Clases grupales de alta intensidad que combinan fuerza y resistencia. Quemás calorías y mejorás tu rendimiento en 45 minutos.',
        detalle: 'Cupos limitados. Se adapta a cada nivel.'
    },
    {
        id: 'yoga',
        nombre: 'Yoga y movilidad',
        categoria: 'Mente-cuerpo',
        nivel: 'Bajo',
        imagen: '/images/actividades/yoga.svg',
        texto: 'Flexibilidad, respiración y recuperación. Ideal para complementar el entrenamiento, prevenir lesiones y bajar el estrés.',
        detalle: 'Para todo el mundo. No tiene contraindicaciones.'
    },
    {
        id: 'nutricion',
        nombre: 'Nutrición',
        categoria: 'Asesoramiento',
        nivel: 'Personalizado',
        imagen: '/images/actividades/nutricion.svg',
        texto: 'Planes alimentarios personalizados con nuestro nutricionista, para acompañar tu entrenamiento y llegar a tus objetivos.',
        detalle: 'Incluye seguimiento y ajustes mensuales.'
    }
];

const ActividadesSelector = () => {
    const [seleccionada, setSeleccionada] = useState(actividades[0].id);
    const actual = actividades.find(a => a.id === seleccionada);

    return (
        <div className="selector">
            {/* Imagen y descripción de la actividad elegida (key reinicia la animación) */}
            <article className="selector-card" key={actual.id} aria-live="polite">
                <div className="selector-imagen">
                    <img src={actual.imagen} alt={`Ilustración de ${actual.nombre}`} />
                </div>
                <div className="selector-info">
                    <div className="chips">
                        <span className={`chip nivel nivel-${actual.nivel.toLowerCase()}`}>{actual.nivel}</span>
                        <span className="chip">{actual.categoria}</span>
                    </div>
                    <h3>{actual.nombre}</h3>
                    <p>{actual.texto}</p>
                    <p className="detalle">{actual.detalle}</p>
                    <Link to="/contacto" className="btn-card">Consultar horarios →</Link>
                </div>
            </article>

            {/* Lista para elegir la actividad */}
            <ul className="selector-lista">
                {actividades.map(a => (
                    <li key={a.id}>
                        <button
                            type="button"
                            className={a.id === seleccionada ? 'activa' : ''}
                            aria-pressed={a.id === seleccionada}
                            onClick={() => setSeleccionada(a.id)}
                            onMouseEnter={() => setSeleccionada(a.id)}
                        >
                            <img src={a.imagen} alt="" />
                            <span className="textos">
                                <strong>{a.nombre}</strong>
                                <small>{a.categoria}</small>
                            </span>
                            <span className={`nivel-texto nivel-${a.nivel.toLowerCase()}`}>{a.nivel}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActividadesSelector;
