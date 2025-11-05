// scripts/build-pkg-complete.js
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildPkgComplete() {
    console.log('=================================');
    console.log('Complete Pkg Build Process');
    console.log('=================================\n');

    const rootDir = path.join(__dirname, '..');
    const distDir = path.join(rootDir, 'dist');

    try {
        // Step 1: Clean
        console.log('📦 Step 1/6: Cleaning...');
        if (fs.existsSync(distDir)) {
            await fs.remove(distDir);
        }
        await fs.ensureDir(distDir);
        console.log('✓ Cleaned\n');

        // Step 2: Build Next.js
        console.log('📦 Step 2/6: Building Next.js...');
        console.log('This may take a few minutes...\n');
        execSync('npm run build', {
            stdio: 'inherit',
            cwd: rootDir
        });
        console.log('✓ Built Next.js\n');

        // Step 3: Verify build
        console.log('📦 Step 3/6: Verifying build...');
        const nextDir = path.join(rootDir, '.next');
        if (!fs.existsSync(nextDir)) {
            throw new Error('.next folder not found after build!');
        }
        console.log('✓ Build verified\n');

        // Step 4: Build executable with pkg
        console.log('📦 Step 4/6: Creating executable...');
        console.log('This may take several minutes...\n');

        execSync(
            'pkg . --targets node16-win-x64 --output dist/bis-aluminum-management.exe --compress Brotli',
            { stdio: 'inherit', cwd: rootDir }
        );
        console.log('✓ Executable created\n');

        // Step 5: Copy required folders next to exe
        console.log('📦 Step 5/6: Copying required files...');

        // Copy .next folder
        await fs.copy(
            path.join(rootDir, '.next'),
            path.join(distDir, '.next')
        );
        console.log('✓ Copied .next folder');

        // Copy public folder
        if (fs.existsSync(path.join(rootDir, 'public'))) {
            await fs.copy(
                path.join(rootDir, 'public'),
                path.join(distDir, 'public')
            );
            console.log('✓ Copied public folder');
        }

        // Step 6: Create launcher batch file
        console.log('\n📦 Step 6/6: Creating launcher...');

        const batchContent = `@echo off
title BIS Aluminum Management System
cls
echo ========================================
echo BIS Aluminum Management System
echo ========================================
echo.
echo Starting application...
echo.
echo Server will be available at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the application
bis-aluminum-management.exe

pause
`;

        await fs.writeFile(
            path.join(distDir, 'start.bat'),
            batchContent
        );
        console.log('✓ Created start.bat');

        // Create README
        const readmeContent = `BIS Aluminum Management System
================================

HOW TO RUN:
-----------
1. Double-click "start.bat"
2. Wait for server to start
3. Browser will open automatically
4. If browser doesn't open, go to: http://localhost:3000

REQUIREMENTS:
-------------
- Windows 7 or higher
- No additional software needed

FOLDER STRUCTURE:
-----------------
bis-aluminum-management.exe  <- Main application
.next/                       <- Application data (required)
public/                      <- Static files (required)
start.bat                    <- Launcher (double-click this)

TROUBLESHOOTING:
----------------
- If app doesn't start, run as Administrator
- Check that port 3000 is not in use
- Ensure all folders (.next, public) are present

DO NOT DELETE THE .next AND public FOLDERS!
They are required for the application to work.

For support: support@example.com
`;

        await fs.writeFile(
            path.join(distDir, 'README.txt'),
            readmeContent
        );
        console.log('✓ Created README.txt\n');

        // Get file sizes
        const exeSize = (fs.statSync(path.join(distDir, 'bis-aluminum-management.exe')).size / 1024 / 1024).toFixed(2);

        console.log('=================================');
        console.log('✅ Build Complete!');
        console.log('=================================');
        console.log(`\nLocation: ${distDir}`);
        console.log(`Executable size: ${exeSize} MB`);
        console.log('\nContents:');
        console.log('- bis-aluminum-management.exe');
        console.log('- .next/ (folder)');
        console.log('- public/ (folder)');
        console.log('- start.bat');
        console.log('- README.txt');
        console.log('\nTo distribute:');
        console.log('1. Zip the entire "dist" folder');
        console.log('2. Users extract and double-click start.bat');
        console.log('3. All files must stay together!\n');

    } catch (error) {
        console.error('\n❌ Build failed!');
        console.error('Error:', error.message);
        process.exit(1);
    }
}

buildPkgComplete();