const routes = require('next-routes')();

routes.add('index', '/').add('game', '/game', 'game');

module.exports = routes;
