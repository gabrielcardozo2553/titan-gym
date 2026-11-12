import React from 'react';
import '../../styles/components/layout/PageHero.css';

const PageHero = ({ etiqueta, titulo, subtitulo }) => {
    return (
        <section className="page-hero">
            <img className="page-hero-logo" src="/images/logo.webp" alt="" aria-hidden="true" />
            <div className="holder">
                <span className="page-hero-etiqueta">{etiqueta}</span>
                <h2>{titulo}</h2>
                {subtitulo && <p>{subtitulo}</p>}
            </div>
        </section>
    );
}

export default PageHero;
