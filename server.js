const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const { join } = require('path');
const next = require('next');

const port = parseInt(process.argv.find(val => val === 'port') || 3000, 10);
const dev = process.env.NODE_ENV !== 'production';

const routes = require('./src/routes');
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        switch (pathname) {
            case '/service-worker.js':
                app.serveStatic(req, res, join(__dirname, '.next', pathname));
                break;
            default:
                handle(req, res, parsedUrl);
                break;
        }
    }).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
