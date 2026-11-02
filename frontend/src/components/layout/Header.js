import React from 'react';
import '../../styles/components/layout/Header.css';

const Header = () => {
    return (
        <header>
            <div className="holder">
                <img src="/images/logo.svg" alt="Logo de Titan Gym" />
                <h1>Titan <span>Gym</span></h1>
            </div>
        </header>
    );
}

export default Header;
