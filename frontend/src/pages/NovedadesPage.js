import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import NovedadItem from '../components/novedades/NovedadItem';

const Novedades = () => {
    const [novedades, setNovedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/novedades`)
            .then(response => setNovedades(response.data))
            .catch(err => {
                console.error(err);
                setError(true);
            })
            .finally(() => setCargando(false));
    }, []);

    return (
        <section className="holder">
            <h2>Novedades</h2>

            {cargando && <p>Cargando novedades...</p>}
            {error && <p>No pudimos cargar las novedades. Intentá de nuevo más tarde.</p>}
            {!cargando && !error && novedades.length === 0 && <p>Todavía no hay novedades.</p>}

            {novedades.map(novedad => (
                <NovedadItem
                    key={novedad.id}
                    titulo={novedad.titulo}
                    subtitulo={novedad.subtitulo}
                    cuerpo={novedad.cuerpo}
                    imagen={novedad.imagen}
                    categoria={novedad.categoria}
                    fecha={novedad.fecha}
                />
            ))}
        </section>
    );
}

export default Novedades;
