import React from 'react';
import PropTypes from 'prop-types';

const ItemGames = ({ onClick, value }) => {
    <div>
        Game #{value}
        <button onClick={onClick} className="secondary-content">
            <i className="material-icons">add_circle_outline</i>
        </button>
    </div>;
};

ItemGames.PropTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default ItemGames;
