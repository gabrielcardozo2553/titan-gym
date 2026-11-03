import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import useTitulo from '../hooks/useTitulo';

const NotFoundPage = () => {
  useTitulo('Página no encontrada');
  return (
    <>
      <PageHero etiqueta="Error 404" titulo="Página no encontrada" subtitulo="La dirección que buscás no existe o fue movida." />
      <main className="holder" style={{ textAlign: 'center', padding: '3rem 0' }}>
        <Link to="/" className="btn-principal">Volver al inicio</Link>
      </main>
    </>
  );
};

export default NotFoundPage;
