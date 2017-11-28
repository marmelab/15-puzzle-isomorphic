const routes = require('next-routes')();

routes
    .add('index', '/')
    .add('game', '/game', 'game')
    .add('multiplayer_games', '/multiplayer', 'multiplayerGames');

module.exports = routes;
