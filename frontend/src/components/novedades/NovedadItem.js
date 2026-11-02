import React from 'react';
import '../../styles/components/novedades/NovedadItem.css';

const NovedadItem = (props) => {
    const { titulo, subtitulo, imagen, cuerpo, categoria, fecha } = props;

    const fechaTexto = fecha
        ? new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <article className="novedad">
            <div className="novedad-meta">
                {categoria && <span className="categoria">{categoria}</span>}
                {fechaTexto && <span className="fecha">{fechaTexto}</span>}
            </div>
            <h3>{titulo}</h3>
            <h4>{subtitulo}</h4>
            {imagen && <img src={imagen} alt={titulo} />}
            {/* El cuerpo lo carga el administrador desde el panel */}
            <div className="cuerpo" dangerouslySetInnerHTML={{ __html: cuerpo }} />
        </article>
    );
}

export default NovedadItem;
