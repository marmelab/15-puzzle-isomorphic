import React from 'react';
import PropTypes from 'prop-types';

import List from '../ui/List';
import Item from '../ui/Item';

const ListGames = ({ games, onGameSelected }) => {
    return games && games.length > 0 ? (
        <List
            items={games.map(game => ({
                label: `Game #${game}`,
                value: game,
            }))}
            onClickItem={onGameSelected}
        >
            <Item icon="add_circle_outline" />
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
