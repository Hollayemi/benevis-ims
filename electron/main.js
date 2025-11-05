// electron/main.js
const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;
let nextServer;
const PORT = 3000;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
        },
        icon: path.join(__dirname, '../public/icon.png'),
        show: false, // Don't show until ready
    });

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Start Next.js server
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
        // Development mode - connect to dev server
        console.log('Development mode - connecting to http://localhost:4003');
        mainWindow.loadURL('http://localhost:4003');
        mainWindow.webContents.openDevTools();
    } else {
        // Production mode - start standalone server
        console.log('Production mode - starting Next.js server');
        startNextServer();

        // Wait for server to start
        setTimeout(() => {
            mainWindow.loadURL(`http://localhost:${PORT}`);
        }, 3000);
    }

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create application menu
    createMenu();
}

function startNextServer() {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) return;

    // Determine paths
    const isPackaged = app.isPackaged;
    let nextServerPath;
    let appPath;

    if (isPackaged) {
        // Running as packaged app
        appPath = path.join(process.resourcesPath, 'app');
        nextServerPath = path.join(appPath, '.next', 'standalone', 'server.js');

        console.log('Packaged app detected');
        console.log('Resource path:', process.resourcesPath);
        console.log('App path:', appPath);
        console.log('Server path:', nextServerPath);
    } else {
        // Running in development
        appPath = path.join(__dirname, '..');
        nextServerPath = path.join(appPath, '.next', 'standalone', 'server.js');
    }

    // Check if server file exists
    if (!fs.existsSync(nextServerPath)) {
        console.error('Server file not found:', nextServerPath);
        dialog.showErrorBox(
            'Application Error',
            'Next.js server files are missing. Please rebuild the application.\n\n' +
            'Expected path: ' + nextServerPath
        );
        app.quit();
        return;
    }

    // Start the Next.js server
    console.log('Starting Next.js server...');

    nextServer = spawn('node', [nextServerPath], {
        env: {
            ...process.env,
            PORT: PORT.toString(),
            HOSTNAME: 'localhost',
            NODE_ENV: 'desktopapp',
            NEXT_APP_TYPE: 'exe',
        },
        cwd: appPath,
        stdio: 'pipe',
    });

    nextServer.stdout.on('data', (data) => {
        console.log(`Next.js: ${data}`);
    });

    nextServer.stderr.on('data', (data) => {
        console.error(`Next.js Error: ${data}`);
    });

    nextServer.on('error', (error) => {
        console.error('Failed to start Next.js server:', error);
        dialog.showErrorBox(
            'Server Error',
            'Failed to start the application server.\n\n' + error.message
        );
    });

    nextServer.on('close', (code) => {
        console.log(`Next.js server exited with code ${code}`);
        if (code !== 0 && mainWindow) {
            dialog.showErrorBox(
                'Server Stopped',
                'The application server has stopped unexpectedly.'
            );
        }
    });
}

function createMenu() {
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Refresh',
                    accelerator: 'F5',
                    click: () => {
                        if (mainWindow) mainWindow.reload();
                    },
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'Alt+F4',
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
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About',
                            message: 'BIS Aluminum Management System',
                            detail: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nNode: ${process.versions.node}`,
                        });
                    },
                },
            ],
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

// App ready
app.whenReady().then(() => {
    console.log('Electron app ready');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// All windows closed
app.on('window-all-closed', () => {
    if (nextServer) {
        console.log('Killing Next.js server...');
        nextServer.kill();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Before quit
app.on('before-quit', () => {
    if (nextServer) {
        nextServer.kill();
    }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    dialog.showErrorBox('Application Error', error.message);
});