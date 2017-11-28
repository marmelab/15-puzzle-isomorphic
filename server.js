const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const { join } = require('path');
const next = require('next');

const port = parseInt(process.argv.find(val => val === 'port') || 3000, 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        switch (pathname) {
            case '/sw.js':
                res.setHeader('content-type', 'text/javascript');
                createReadStream('./offline/sw.js').pipe(res);
                break;
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
