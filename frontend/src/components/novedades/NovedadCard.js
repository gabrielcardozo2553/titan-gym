import React, { useState } from 'react';
import '../../styles/components/novedades/NovedadCard.css';

const formatearFecha = (fecha) =>
    fecha ? new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

const NovedadCard = ({ novedad, destacada = false }) => {
    const [abierta, setAbierta] = useState(false);
    const { titulo, subtitulo, cuerpo, categoria, fecha, imagen } = novedad;

    const imagenFinal = imagen || (categoria ? `/images/novedades/${categoria}.svg` : '');
    const mostrarTexto = destacada || abierta;

    return (
        <article className={`novedad-card ${destacada ? 'destacada' : ''}`}>
            {imagenFinal && (
                <div className="novedad-imagen">
                    <img loading="lazy" src={imagenFinal} alt={titulo} />
                    {destacada && <span className="sello">Última novedad</span>}
                </div>
            )}
            <div className="novedad-cuerpo">
                <div className="novedad-meta">
                    {categoria && <span className="categoria">{categoria}</span>}
                    <span className="fecha">{formatearFecha(fecha)}</span>
                </div>
                <h3>{titulo}</h3>
                <p className="subtitulo">{subtitulo}</p>

                {mostrarTexto && <div className="texto" dangerouslySetInnerHTML={{ __html: cuerpo }} />}

                {!destacada && (
                    <button type="button" className="leer-mas" onClick={() => setAbierta(!abierta)} aria-expanded={abierta}>
                        {abierta ? 'Cerrar −' : 'Leer más +'}
                    </button>
                )}
            </div>
        </article>
    );
}

export default NovedadCard;
