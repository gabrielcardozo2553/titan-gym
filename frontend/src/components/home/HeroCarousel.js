import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/components/home/HeroCarousel.css';

const slides = [
    {
        imagen: '/images/home/slide1.svg',
        etiqueta: 'Empezá hoy',
        titulo: 'Superá tus límites en Titan Gym',
        texto: 'Tu primera clase de prueba es sin costo.',
        botones: [
            { texto: 'Ver planes', href: '#planes', principal: true },
            { texto: 'Conocer más', href: '/nosotros' }
        ]
    },
    {
        imagen: '/images/home/slide2.svg',
        etiqueta: 'Equipo profesional',
        titulo: 'Entrená bien acompañado',
        texto: 'Entrenadores certificados que arman tu rutina según tu objetivo.',
        botones: [
            { texto: 'Conocer al equipo', href: '/nosotros', principal: true },
            { texto: 'Contacto', href: '/contacto' }
        ]
    },
    {
        imagen: '/images/home/slide3.svg',
        etiqueta: 'Clases grupales',
        titulo: 'Funcional, HIIT y yoga',
        texto: 'Clases todos los días para todos los niveles.',
        botones: [
            { texto: 'Qué podés entrenar', href: '#actividades', principal: true },
            { texto: 'Novedades', href: '/novedades' }
        ]
    },
    {
        imagen: '/images/home/slide4.svg',
        etiqueta: 'Promo de noviembre',
        titulo: 'Inscripción gratis',
        texto: 'Sumate al plan Full este mes y no pagás la matrícula.',
        botones: [
            { texto: 'Consultar ahora', href: '/contacto', principal: true },
            { texto: 'Ver planes', href: '#planes' }
        ]
    }
];

const INTERVALO = 6000;

const HeroCarousel = () => {
    const [actual, setActual] = useState(0);
    const [pausado, setPausado] = useState(false);

    const ir = useCallback((indice) => {
        setActual((indice + slides.length) % slides.length);
    }, []);

    // Avance automático (se frena al pasar el mouse o enfocar con el teclado)
    useEffect(() => {
        if (pausado) return undefined;
        const id = setInterval(() => setActual(i => (i + 1) % slides.length), INTERVALO);
        return () => clearInterval(id);
    }, [pausado, actual]);

    return (
        <section
            className="carrusel"
            aria-roledescription="carrusel"
            aria-label="Destacados de Titan Gym"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
            onFocus={() => setPausado(true)}
            onBlur={() => setPausado(false)}
        >
            {slides.map((s, i) => (
                <div
                    key={s.titulo}
                    className={`slide ${i === actual ? 'activa' : ''}`}
                    style={{ backgroundImage: `url(${s.imagen})` }}
                    aria-hidden={i !== actual}
                >
                    <div className="slide-contenido">
                        <span className="etiqueta">{s.etiqueta}</span>
                        <h2>{s.titulo}</h2>
                        <p>{s.texto}</p>
                        <div className="botones">
                            {s.botones.map(b => (
                                <a
                                    key={b.texto}
                                    href={b.href}
                                    className={b.principal ? 'btn-principal' : 'btn-secundario'}
                                    tabIndex={i === actual ? 0 : -1}
                                >
                                    {b.texto}{b.principal ? ' →' : ''}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <button className="flecha izq" onClick={() => ir(actual - 1)} aria-label="Anterior">‹</button>
            <button className="flecha der" onClick={() => ir(actual + 1)} aria-label="Siguiente">›</button>

            <div className="puntos">
                {slides.map((s, i) => (
                    <button
                        key={s.titulo}
                        className={i === actual ? 'activo' : ''}
                        onClick={() => ir(i)}
                        aria-label={`Ir a la diapositiva ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default HeroCarousel;
