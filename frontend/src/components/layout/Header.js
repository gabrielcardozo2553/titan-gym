import React from 'react';
import '../../styles/components/layout/Header.css';

const Header = () => {
    return (
        <header>
            <div className="holder">
                <img src="/images/logo.png" alt="Logo de Atletic Gym" />
                <div className="marca">
                    <h1>Atletic <span>Gym</span></h1>
                    <p>Hierro, sudor y gloria</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
