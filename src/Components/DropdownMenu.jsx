import React from 'react';

const DropdownMenu = ({ options, onSelectOption }) => {
    const handleOptionClick = (option) => {
        onSelectOption(option);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Выбрать вариант
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {options.map(option => (
                    <button key={option.id} className="dropdown-item" type="button" onClick={() => handleOptionClick(option)}>
                        {option.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropdownMenu;