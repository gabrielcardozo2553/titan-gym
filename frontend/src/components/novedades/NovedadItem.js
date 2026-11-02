import React from 'react';
import '../../styles/components/novedades/NovedadItem.css';

const NovedadItem = (props) => {
    const { titulo, subtitulo, imagen, cuerpo, categoria, fecha } = props;

    const fechaTexto = fecha
        ? new Date(fecha).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    // Si la novedad no tiene foto propia se usa la ilustración de su categoría
    const imagenFinal = imagen || (categoria ? `/images/novedades/${categoria}.svg` : '');

    return (
        <article className="novedad">
            <div className="novedad-meta">
                {categoria && <span className="categoria">{categoria}</span>}
                {fechaTexto && <span className="fecha">{fechaTexto}</span>}
            </div>
            <h3>{titulo}</h3>
            <h4>{subtitulo}</h4>
            {imagenFinal && <img className={imagen ? '' : 'ilustracion'} src={imagenFinal} alt={titulo} />}
            {/* El cuerpo lo carga el administrador desde el panel */}
            <div className="cuerpo" dangerouslySetInnerHTML={{ __html: cuerpo }} />
        </article>
    );
}

export default NovedadItem;
