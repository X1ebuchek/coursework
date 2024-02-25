import React from 'react';
import '../CSS/fire.css';

const Flame = ({ position }) => {
    return (
        <div className={`holder ${position}`}>
            <div className="candle">
                <div className="blinking-glow"></div>
                <div className="thread"></div>
                <div className="glow"></div>
                <div className="flame"></div>
            </div>
        </div>
    );
};

export default Flame;