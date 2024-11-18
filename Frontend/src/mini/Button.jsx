import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ text, onClick, type, className, icon }) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}>
            {text}
            {icon && <FontAwesomeIcon icon={icon} className="ml-3 text-wite" />}
        </button>
    );
};

export default Button;
