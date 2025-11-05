#!/usr/bin/env node

// server.js - Debug version for Pkg
const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

// Logging function
function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

log('=================================');
log('BIS Aluminum Management System');
log('=================================');

// Detect if running as pkg executable
const isPkg = typeof process.pkg !== 'undefined';
log(`Running as Pkg: ${isPkg}`);
log(`Process execPath: ${process.execPath}`);
log(`__dirname: ${__dirname}`);

// Determine paths
let appDir, nextDir, publicDir;

if (isPkg) {
    // Running as packaged executable
    appDir = path.dirname(process.execPath);
    nextDir = path.join(process.cwd(), '.next');
    publicDir = path.join(process.cwd(), 'public');

    log(`Pkg detected - using snapshot paths`);
    log(`App directory: ${appDir}`);
    log(`Next directory: ${nextDir}`);
    log(`Public directory: ${publicDir}`);

    // Check if .next exists in current directory
    if (!fs.existsSync(nextDir)) {
        log('ERROR: .next folder not found!');
        log('Please ensure .next folder is in the same directory as the .exe');
        log('Press any key to exit...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
        return;
    }

    if (!fs.existsSync(publicDir)) {
        log('WARNING: public folder not found!');
    }
} else {
    // Running with node
    appDir = __dirname;
    nextDir = path.join(__dirname, '.next');
    publicDir = path.join(__dirname, 'public');

    log(`Running with node directly`);
    log(`App directory: ${appDir}`);
}

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';

log(`Node version: ${process.version}`);
log(`Environment: ${process.env.NODE_ENV}`);

const hostname = 'localhost';
const port = process.env.PORT || 3000;

log(`Starting server on ${hostname}:${port}`);

// Try to load Next.js
let next, app, handle;

try {
    log('Loading Next.js...');
    next = require('next');

    log('Creating Next.js app instance...');
    app = next({
        dev: false,
        dir: isPkg ? process.cwd() : appDir,
        conf: {
            distDir: '.next',
            compress: true,
            poweredByHeader: false,
            generateEtags: false,
        }
    });

    handle = app.getRequestHandler();
    log('Next.js loaded successfully');

} catch (error) {
    log('ERROR: Failed to load Next.js');
    log(`Error: ${error.message}`);
    log(`Stack: ${error.stack}`);
    log('\nPress any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
    return;
}

// Prepare and start server
log('Preparing Next.js app...');

app.prepare()
    .then(() => {
        log('Next.js app prepared successfully');

        createServer(async (req, res) => {
            try {
                const parsedUrl = parse(req.url, true);
                await handle(req, res, parsedUrl);
            } catch (err) {
                log(`Request error: ${err.message}`);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        }).listen(port, hostname, (err) => {
            if (err) {
                log(`ERROR: Failed to start server: ${err.message}`);
                process.exit(1);
            }

            log('=================================');
            log('✅ Server is running!');
            log(`🌐 URL: http://${hostname}:${port}`);
            log('=================================');
            log('Press Ctrl+C to stop the server');

            // Try to open browser
            if (process.platform === 'win32') {
                try {
                    const { exec } = require('child_process');
                    exec(`start http://${hostname}:${port}`, (error) => {
                        if (error) {
                            log('Could not auto-open browser');
                        } else {
                            log('Browser opened automatically');
                        }
                    });
                } catch (e) {
                    log('Could not auto-open browser');
                }
            }
        });
    })
    .catch((err) => {
        log('=================================');
        log('ERROR: Failed to prepare Next.js app');
        log('=================================');
        log(`Error: ${err.message}`);
        log(`Stack: ${err.stack}`);
        log('\nCommon issues:');
        log('1. .next folder is missing or incomplete');
        log('2. Dependencies are not included');
        log('3. File permissions issues');
        log('\nPress any key to exit...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', process.exit.bind(process, 0));
    });

// Handle shutdown
const shutdown = () => {
    log('\nShutting down...');
    process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Handle errors
process.on('uncaughtException', (err) => {
    log(`Uncaught Exception: ${err.message}`);
    log(`Stack: ${err.stack}`);
});

process.on('unhandledRejection', (err) => {
    log(`Unhandled Rejection: ${err.message}`);
    log(`Stack: ${err.stack}`);
});