import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import PageHero from '../components/layout/PageHero';
import '../styles/pages/ContactoPage.css';

const initialForm = {
    nombre: '',
    email: '',
    telefono: '',
    motivo: 'Quiero información de planes',
    mensaje: ''
};

const motivos = [
    'Quiero información de planes',
    'Reservar clase de prueba',
    'Consulta sobre clases',
    'Nutrición y asesoramiento',
    'Otro'
];

const preguntas = [
    { p: '¿Necesito experiencia previa para entrenar?', r: 'No. Un profesor te arma una rutina según tu nivel y te enseña la técnica desde el primer día.' },
    { p: '¿Cómo reservo mi clase de prueba?', r: 'Escribinos desde este formulario eligiendo "Reservar clase de prueba" o pasá por recepción. La primera clase es sin costo.' },
    { p: '¿Hay descuento para estudiantes?', r: 'Sí, el plan Estudiante tiene tarifa reducida para entrenar hasta 5 días por semana. Traé tu certificado de alumno regular.' },
    { p: '¿Puedo pausar mi plan si viajo?', r: 'Podés congelar tu plan hasta 30 días por año avisando con anticipación en recepción.' }
];

// Íconos simples en SVG (sin librerías externas)
const Icono = ({ tipo }) => {
    const rutas = {
        ubicacion: 'M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z',
        telefono: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.55 3.5a1 1 0 0 1-.25 1z',
        mail: 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.5 7v.2L12 12.4 19.5 7.2V7z',
        instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 12 14.5 2.5 2.5 0 0 1 12 9.5zM17.3 6.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
    };
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
            <path d={rutas[tipo]} />
        </svg>
    );
};

const ContactoPage = () => {
    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [exito, setExito] = useState(false);
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value // clave dinámica según el name del input
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');

        // Validación rápida en el navegador (el backend vuelve a validar)
        if (!formData.nombre.trim() || !formData.email.trim() || !formData.mensaje.trim()) {
            setExito(false);
            setMsg('Completá tu nombre, email y mensaje.');
            return;
        }

        setSending(true);
        try {
            const response = await axios.post(`${API_URL}/api/contacto`, formData);
            setMsg(response.data.message);
            setExito(true);
            setFormData(initialForm);
        } catch (err) {
            // El backend devuelve un mensaje claro (por ejemplo, un email inválido)
            setMsg(err.response?.data?.message || 'Ocurrió un error al enviar el mensaje. Intentá nuevamente.');
            setExito(false);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <PageHero
                etiqueta="Hablemos"
                titulo="Contacto"
                subtitulo="Escribinos y empezá a entrenar esta semana."
            />

            <main className="holder contacto-pagina">
                <div className="contacto-grid">
                    {/* Datos del gimnasio */}
                    <aside className="contacto-info">
                        <h2>Dónde encontrarnos</h2>
                        <ul className="medios">
                            <li><span className="icono"><Icono tipo="ubicacion" /></span><div><strong>Dirección</strong><span>Av. Libertad 1450, Corrientes</span></div></li>
                            <li><span className="icono"><Icono tipo="telefono" /></span><div><strong>Teléfono</strong><span>379 412-3456</span></div></li>
                            <li><span className="icono"><Icono tipo="mail" /></span><div><strong>Email</strong><span>contacto@atleticgym.example</span></div></li>
                            <li><span className="icono"><Icono tipo="instagram" /></span><div><strong>Instagram</strong><span>@atleticgym.ctes</span></div></li>
                        </ul>

                        <div className="horarios">
                            <h3>Horarios</h3>
                            <dl>
                                <div><dt>Lunes a viernes</dt><dd>7:00 a 22:00</dd></div>
                                <div><dt>Sábados</dt><dd>9:00 a 14:00</dd></div>
                                <div><dt>Domingos</dt><dd>Cerrado</dd></div>
                            </dl>
                        </div>
                    </aside>

                    {/* Formulario (se guarda en la base de datos) */}
                    <section className="contacto-form">
                        <h2>Escribinos</h2>
                        <form className="formulario" onSubmit={handleSubmit} noValidate>
                            <div className="fila">
                                <label htmlFor="nombre">Nombre
                                    <input type="text" id="nombre" name="nombre" value={formData.nombre}
                                        onChange={handleChange} placeholder="Tu nombre" />
                                </label>
                                <label htmlFor="telefono">Teléfono
                                    <input type="tel" id="telefono" name="telefono" value={formData.telefono}
                                        onChange={handleChange} placeholder="Opcional" />
                                </label>
                            </div>
                            <label htmlFor="email">Email
                                <input type="email" id="email" name="email" value={formData.email}
                                    onChange={handleChange} placeholder="tu@email.com" />
                            </label>
                            <label htmlFor="motivo">Motivo de la consulta
                                <select id="motivo" name="motivo" value={formData.motivo} onChange={handleChange}>
                                    {motivos.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </label>
                            <label htmlFor="mensaje">Mensaje
                                <textarea id="mensaje" name="mensaje" value={formData.mensaje}
                                    onChange={handleChange} placeholder="Contanos en qué podemos ayudarte"></textarea>
                            </label>

                            {msg ? <p className={`estado ${exito ? 'ok' : 'error'}`} role="status">{msg}</p> : null}

                            <button type="submit" disabled={sending}>
                                {sending ? 'Enviando...' : 'Enviar mensaje'}
                            </button>
                        </form>
                    </section>
                </div>

                {/* Preguntas frecuentes */}
                <section className="faq">
                    <h2>Preguntas frecuentes</h2>
                    {preguntas.map(item => (
                        <details key={item.p}>
                            <summary>{item.p}</summary>
                            <p>{item.r}</p>
                        </details>
                    ))}
                </section>
            </main>
        </>
    );
}

export default ContactoPage;
