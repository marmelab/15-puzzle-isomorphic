import React from 'react';
import PropTypes from 'prop-types';

import List from '../ui/List';

const ListGames = ({ games, onGameSelected }) => {
    return games && games.length > 0 ? (
        <List
            icon="add_circle_outline"
            items={games.map(game => ({
                label: `Game #${game}`,
                value: game,
            }))}
            onClickItem={onGameSelected}
        />
    ) : (
        <p>There is no open multiplayer games.</p>
    );
};

ListGames.propTypes = {
    games: PropTypes.array.isRequired,
    onGameSelected: PropTypes.func.isRequired,
};

export default ListGames;
