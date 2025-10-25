// server.js
const { join } = require('path');
const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: false,
    dir: __dirname
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        handle(req, res, req.url);
    }).listen(3000, () => {
        console.log('✅ App is running at http://localhost:3000');
    });
});
