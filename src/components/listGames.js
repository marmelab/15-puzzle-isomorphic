import React from 'react';
import PropTypes from 'prop-types';

import List from './list';
import ItemGames from './itemGames';

const ListGames = ({ games, onItemSelected }) => (
    <List items={games} title="Open multiplayer games">
        <ItemGames onClick={onItemSelected} />
    </List>
);

ListGames.propTypes = {
    games: PropTypes.array.isRequired,
    onItemSelected: PropTypes.func.isRequired,
};

export default List;
