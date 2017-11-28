import React from 'react';
import PropTypes from 'prop-types';

import List from './list';
import ItemGames from './itemGames';

const ListGames = ({ games, onItemSelected }) => {
    const handleClick = value => {
        onItemSelected(value);
    };

    return (
        <List items={games} title="Open multiplayer games">
            <ItemGames onClick={handleClick} />
        </List>
    );
};

ListGames.propTypes = {
    games: PropTypes.array.isRequired,
    onItemSelected: PropTypes.func.isRequired,
};

export default List;
