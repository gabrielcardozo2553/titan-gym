import React from 'react';
import '../../styles/components/layout/Footer.css';

const Footer = () => {
    return (
        <footer>
            <p><strong>Atletic Gym</strong> · Av. Libertad 1450, Corrientes</p>
            <p>© {new Date().getFullYear()} Atletic Gym. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;
