import React from 'react';
import PropTypes from 'prop-types';

import List from '../ui/List';
import ItemGames from './ItemGames';

const ListGames = ({ games, onGameSelected }) => {
    return games && games.length > 0 ? (
        <List items={games} onClickItem={onGameSelected}>
            <ItemGames />
        </List>
    ) : (
        <p>There is no open multiplayer games.</p>
    );
};

ListGames.propTypes = {
    games: PropTypes.array.isRequired,
    onGameSelected: PropTypes.func.isRequired,
};

export default ListGames;
