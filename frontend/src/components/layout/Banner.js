import React from 'react';
import '../../styles/components/layout/Banner.css';

const Banner = ({ imagen, alt }) => {
    return (
        <div className="banner holder">
            <img src={imagen} alt={alt} />
        </div>
    );
}

export default Banner;
