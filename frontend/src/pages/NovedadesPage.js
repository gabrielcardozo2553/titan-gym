import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import PageHero from '../components/layout/PageHero';
import NovedadCard from '../components/novedades/NovedadCard';
import '../styles/pages/NovedadesPage.css';

const filtros = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'clases', texto: 'Clases' },
    { valor: 'eventos', texto: 'Eventos' },
    { valor: 'consejos', texto: 'Consejos' },
    { valor: 'promociones', texto: 'Promociones' }
];

const Novedades = () => {
    const [novedades, setNovedades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [filtro, setFiltro] = useState('todas');

    useEffect(() => {
        axios.get(`${API_URL}/api/novedades`)
            .then(response => setNovedades(response.data))
            .catch(err => {
                console.error(err);
                setError(true);
            })
            .finally(() => setCargando(false));
    }, []);

    // La API devuelve las novedades de la más nueva a la más vieja
    const visibles = filtro === 'todas' ? novedades : novedades.filter(n => n.categoria === filtro);
    const [destacada, ...resto] = visibles;

    return (
        <>
            <PageHero
                etiqueta="Lo último"
                titulo="Novedades"
                subtitulo="Clases nuevas, eventos, consejos y promociones de Atletic Gym."
            />

            <section className="holder novedades-pagina">
                <div className="filtros" role="group" aria-label="Filtrar por categoría">
                    {filtros.map(f => (
                        <button
                            key={f.valor}
                            type="button"
                            className={filtro === f.valor ? 'activo' : ''}
                            aria-pressed={filtro === f.valor}
                            onClick={() => setFiltro(f.valor)}
                        >
                            {f.texto}
                        </button>
                    ))}
                </div>

                {cargando && <p className="estado-pagina">Cargando novedades...</p>}
                {error && <p className="estado-pagina">No pudimos cargar las novedades. Intentá de nuevo más tarde.</p>}
                {!cargando && !error && visibles.length === 0 && (
                    <p className="estado-pagina">No hay novedades en esta categoría todavía.</p>
                )}

                {destacada && <NovedadCard novedad={destacada} destacada />}

                <div className="novedades-grid">
                    {resto.map(n => <NovedadCard key={n.id} novedad={n} />)}
                </div>
            </section>
        </>
    );
}

export default Novedades;
