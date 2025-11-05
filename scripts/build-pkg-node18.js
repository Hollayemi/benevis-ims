const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

async function buildWithNode18() {
    console.log('=================================');
    console.log('Building with Node 18 for Next.js 15');
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
        execSync('npm run build', {
            stdio: 'inherit',
            cwd: rootDir
        });
        console.log('✓ Built\n');

        // Step 3: Create executable with Node 18
        console.log('📦 Step 3/6: Creating executable with Node 18...');
        console.log('This may take 10-15 minutes on first run...');
        console.log('Pkg needs to download and compile Node 18 binary\n');

        // Try different approaches
        let success = false;

        // Approach 1: Try with node18-win-x64
        try {
            console.log('Attempting with node18-win-x64...');
            execSync(
                'npx @yao-pkg/pkg . --targets node18-win-x64 --output dist/bis-aluminum-management.exe --public --compress Brotli',
                { stdio: 'inherit', cwd: rootDir, timeout: 900000 } // 15 min timeout
            );
            success = true;
        } catch (e) {
            console.log('Failed with node18-win-x64, trying alternative...\n');
        }

        if (!success) {
            // Approach 2: Try with latest LTS
            try {
                console.log('Attempting with node18-latest-win-x64...');
                execSync(
                    'npx @yao-pkg/pkg . --targets node18.20.0-win-x64 --output dist/bis-aluminum-management.exe --public',
                    { stdio: 'inherit', cwd: rootDir, timeout: 900000 }
                );
                success = true;
            } catch (e) {
                throw new Error('Failed to build with pkg. See error above.');
            }
        }

        console.log('✓ Executable created\n');

        // Step 4: Copy required folders
        console.log('📦 Step 4/6: Copying required files...');

        await fs.copy(
            path.join(rootDir, '.next'),
            path.join(distDir, '.next')
        );
        console.log('✓ Copied .next');

        if (fs.existsSync(path.join(rootDir, 'public'))) {
            await fs.copy(
                path.join(rootDir, 'public'),
                path.join(distDir, 'public')
            );
            console.log('✓ Copied public');
        }

        // Step 5: Create launcher
        console.log('\n📦 Step 5/6: Creating launcher...');

        const batchContent = `@echo off
title BIS Aluminum Management System
color 0A
cls
echo ========================================
echo BIS Aluminum Management System
echo ========================================
echo.
echo Starting server...
echo.

REM Check if required folders exist
if not exist ".next" (
    echo ERROR: .next folder is missing!
    echo Please ensure all files are extracted together.
    pause
    exit
)

echo Server will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

start http://localhost:3000
bis-aluminum-management.exe

pause
`;

        await fs.writeFile(path.join(distDir, 'start.bat'), batchContent);
        console.log('✓ Created start.bat');

        // Step 6: Create README
        console.log('\n📦 Step 6/6: Creating documentation...');

        const readmeContent = `BIS Aluminum Management System
================================

IMPORTANT: DO NOT SEPARATE THE FILES!
All files must remain in the same folder.

QUICK START:
-----------
Double-click "start.bat" to run the application.
Browser will open automatically.

MANUAL START:
------------
1. Double-click "bis-aluminum-management.exe"
2. Wait 5-10 seconds for server to start
3. Open browser to: http://localhost:3000

FOLDER CONTENTS:
---------------
bis-aluminum-management.exe  <- Main executable (48-52 MB)
.next/                       <- Application files (REQUIRED)
public/                      <- Static files (REQUIRED)
start.bat                    <- Quick launcher
README.txt                   <- This file

REQUIREMENTS:
------------
- Windows 7 or higher (64-bit)
- No additional software required
- Port 3000 must be available

TROUBLESHOOTING:
---------------
If the app doesn't start:

1. Run as Administrator
   - Right-click start.bat
   - Select "Run as administrator"

2. Check port 3000
   - Close other apps using port 3000
   - Or change port: set PORT=3001 && start.bat

3. Firewall
   - Windows Firewall may block first run
   - Click "Allow access" when prompted

4. Antivirus
   - Some antivirus software may flag the .exe
   - Add exception if necessary

5. Missing folders
   - Ensure .next and public folders are present
   - Re-extract all files from the zip

ERROR MESSAGES:
--------------
"Request is not defined"
  -> This means Node 18 wasn't used in build
  -> Contact support for proper build

"Cannot find module"
  -> .next folder is missing or corrupted
  -> Re-extract all files

"Port 3000 already in use"
  -> Another app is using port 3000
  -> Close that app or change port

DISTRIBUTION:
------------
When sharing this app:
1. Zip the ENTIRE dist folder
2. Recipient extracts EVERYTHING
3. Run start.bat

For support: support@example.com
Version: 1.0.0
Build: ${new Date().toISOString()}
`;

        await fs.writeFile(path.join(distDir, 'README.txt'), readmeContent);
        console.log('✓ Created README.txt\n');

        // Summary
        const exeSize = (fs.statSync(path.join(distDir, 'bis-aluminum-management.exe')).size / 1024 / 1024).toFixed(2);

        console.log('=================================');
        console.log('✅ Build Complete!');
        console.log('=================================');
        console.log(`\nExecutable: ${exeSize} MB`);
        console.log(`Location: ${distDir}`);
        console.log('\nTo test:');
        console.log('  cd dist');
        console.log('  start.bat');
        console.log('\nTo distribute:');
        console.log('  Zip the entire "dist" folder\n');

    } catch (error) {
        console.error('\n❌ Build failed!');
        console.error('Error:', error.message);
        console.error('\nIf pkg fails to download Node 18 binaries,');
        console.error('this is a known issue. Consider using:');
        console.error('  - Portable build (npm run build:portable)');
        console.error('  - Electron build (more reliable)\n');
        process.exit(1);
    }
}

buildWithNode18();