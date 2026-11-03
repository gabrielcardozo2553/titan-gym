import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Banner from '../components/layout/Banner';
import '../styles/pages/ContactoPage.css';

const initialForm = {
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
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
        setSending(true);
        try {
            const response = await axios.post(`${API_URL}/api/contacto`, formData);
            setMsg(response.data.message);
            setExito(true);
            setFormData(initialForm);
        } catch (err) {
            // El backend devuelve un mensaje claro (por ejemplo, campos faltantes)
            setMsg(err.response?.data?.message || 'Ocurrió un error al enviar el mensaje. Intentá nuevamente.');
            setExito(false);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
        <Banner imagen="/images/banners/contacto.svg" alt="Contacto con Atletic Gym" />
        <main className="holder contacto">
            <div>
                <h2>Consultá sin compromiso</h2>
                <form className="formulario" onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" id="telefono" name="telefono" value={formData.telefono}
                            onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" value={formData.mensaje}
                            onChange={handleChange}></textarea>
                    </p>
                    {sending ? <p className="estado">Enviando...</p> : null}
                    {msg ? <p className={`estado ${exito ? 'ok' : 'error'}`}>{msg}</p> : null}
                    <p className="acciones"><input type="submit" value="Enviar" disabled={sending} /></p>
                </form>
            </div>
            <div className="datos">
                <h2>Dónde encontrarnos</h2>
                <p>Visitanos o escribinos por cualquiera de estos medios:</p>
                <ul>
                    <li>Dirección: Av. Libertad 1450, Corrientes</li>
                    <li>Teléfono: 379 412-3456</li>
                    <li>Email: contacto@atleticgym.example</li>
                    <li>Instagram: @atleticgym.ctes</li>
                    <li>Horarios: lunes a viernes de 7 a 22 h, sábados de 9 a 14 h</li>
                </ul>
            </div>
        </main>
        </>
    );
}

export default ContactoPage;
