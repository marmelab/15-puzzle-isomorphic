const routes = require('next-routes')();

routes
    .add('index', '/')
    .add('game', '/game', 'game')
    .add('multiplayer_games', '/multiplayer', 'multiplayerGames')
    .add('multiplayer_game', '/multiplayer/game', 'multiplayerGame');

module.exports = routes;
