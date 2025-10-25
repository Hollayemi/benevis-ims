// electron/main.js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let nextServer;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        icon: path.join(__dirname, '../public/icon.png'), // Add your icon
    });

    // Start Next.js server
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        // In development, connect to running dev server
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // In production, start the standalone server
        const nextServerPath = path.join(__dirname, '../.next/standalone/server.js');

        nextServer = spawn('node', [nextServerPath], {
            env: {
                ...process.env,
                PORT: '3000',
                HOSTNAME: 'localhost',
            },
        });

        nextServer.stdout.on('data', (data) => {
            console.log(`Next.js: ${data}`);
        });

        nextServer.stderr.on('data', (data) => {
            console.error(`Next.js Error: ${data}`);
        });

        // Wait for server to start then load
        setTimeout(() => {
            mainWindow.loadURL('http://localhost:3000');
        }, 2000);
    }

    // Create application menu
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Exit',
                    click: () => {
                        app.quit();
                    },
                },
            ],
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
            ],
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
            ],
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        console.log('About BIS Aluminum Management System');
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (nextServer) {
        nextServer.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    if (nextServer) {
        nextServer.kill();
    }
});