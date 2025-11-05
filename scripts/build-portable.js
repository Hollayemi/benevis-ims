// scripts/build-portable.js - Create portable app without Pkg
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function buildPortable() {
    console.log('=================================');
    console.log('Building Portable Application');
    console.log('=================================\n');

    const rootPath = path.join(__dirname, '..');
    const distPath = path.join(rootPath, 'portable-build');

    try {
        // Step 1: Clean dist directory
        console.log('📦 Step 1/5: Cleaning build directory...');
        if (fs.existsSync(distPath)) {
            await fs.remove(distPath);
        }
        await fs.mkdirp(distPath);
        console.log('✓ Cleaned\n');

        // Step 2: Build Next.js
        console.log('📦 Step 2/5: Building Next.js...');
        process.env.NODE_ENV = 'desktopapp';
        execSync('npx next build', {
            stdio: 'inherit',
            cwd: rootPath
        });
        console.log('✓ Built\n');

        // Step 3: Copy necessary files
        console.log('📦 Step 3/5: Copying files...');

        const filesToCopy = [
            { src: '.next', dest: '.next' },
            { src: 'public', dest: 'public' },
            { src: 'package.json', dest: 'package.json' },
            { src: 'server.js', dest: 'server.js' },
            { src: 'next.config.mjs', dest: 'next.config.mjs' },
        ];

        for (const file of filesToCopy) {
            const srcPath = path.join(rootPath, file.src);
            const destPath = path.join(distPath, file.dest);

            if (fs.existsSync(srcPath)) {
                await fs.copy(srcPath, destPath);
                console.log(`✓ Copied: ${file.src}`);
            }
        }
        console.log();

        // Step 4: Create minimal package.json
        console.log('📦 Step 4/5: Creating minimal package.json...');
        const minimalPackage = {
            name: "bis-aluminum-management",
            version: "1.0.0",
            main: "server.js",
            scripts: {
                start: "node server.js"
            },
            dependencies: {
                "next": "15.1.3",
                "react": "19.0.0",
                "react-dom": "19.0.0"
            }
        };

        await fs.writeJson(
            path.join(distPath, 'package.json'),
            minimalPackage,
            { spaces: 2 }
        );
        console.log('✓ Created\n');

        // Step 5: Create launcher scripts
        console.log('📦 Step 5/5: Creating launcher scripts...');

        // Windows batch file
        const batchContent = `@echo off
echo ========================================
echo BIS Aluminum Management System
echo ========================================
echo.
echo Starting server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --production
    echo.
)

echo Server starting on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

node server.js

pause
`;

        await fs.writeFile(
            path.join(distPath, 'start.bat'),
            batchContent
        );
        console.log('✓ Created start.bat');

        // PowerShell script
        const psContent = `Write-Host "========================================"
Write-Host "BIS Aluminum Management System"
Write-Host "========================================"
Write-Host ""
Write-Host "Starting server..."
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install --production
    Write-Host ""
}

Write-Host "Server starting on http://localhost:3000"
Write-Host ""
Write-Host "Press Ctrl+C to stop the server"
Write-Host "========================================"
Write-Host ""

node server.js
`;

        await fs.writeFile(
            path.join(distPath, 'start.ps1'),
            psContent
        );
        console.log('✓ Created start.ps1');

        // README file
        const readmeContent = `# BIS Aluminum Management System

## How to Run

### Option 1: Double-click start.bat
- Simply double-click "start.bat" to start the application
- The application will open automatically in your browser

### Option 2: Command Line
1. Open Command Prompt in this folder
2. Run: npm install --production (first time only)
3. Run: npm start
4. Open browser to: http://localhost:3000

### Requirements
- Node.js 18 or higher must be installed
- No internet connection required after initial setup

### First Time Setup
1. Double-click start.bat
2. Wait for dependencies to install (one-time only)
3. Application will start automatically

### Troubleshooting
- If the app doesn't start, make sure Node.js is installed
- Check that port 3000 is not in use by another application
- Try running as Administrator

### Support
Contact: support@example.com
`;

        await fs.writeFile(
            path.join(distPath, 'README.txt'),
            readmeContent
        );
        console.log('✓ Created README.txt\n');

        console.log('=================================');
        console.log('✅ Portable build completed!');
        console.log('=================================');
        console.log('\nLocation: portable-build/');
        console.log('\nTo use:');
        console.log('1. Copy the "portable-build" folder to any Windows PC');
        console.log('2. Ensure Node.js is installed on that PC');
        console.log('3. Double-click "start.bat" to run\n');
        console.log('Note: Dependencies will be installed on first run\n');

    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

buildPortable();