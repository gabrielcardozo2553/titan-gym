import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NovedadItem from '../components/novedades/NovedadItem';

const Novedades = (props) => {

    const [novedades, setNovedades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/novedades')
            .then(response => {
                setNovedades(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <section className="holder">
            <h2>Novedades</h2>

            {novedades.map(novedad => (
                <NovedadItem
                    key={novedad.id}
                    titulo={novedad.titulo}
                    subtitulo={novedad.subtitulo}
                    cuerpo={novedad.cuerpo}
                    imagen={novedad.imagen}
                />
            ))}

        </section>
    );
}

export default Novedades;