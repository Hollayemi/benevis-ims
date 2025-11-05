// scripts/build-pkg.js - Build script with progress logging
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

function runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`\n▶ Running: ${command} ${args.join(' ')}\n`);

        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: true,
            ...options
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command failed with exit code ${code}`));
            } else {
                resolve();
            }
        });

        child.on('error', (error) => {
            reject(error);
        });
    });
}

async function buildForPkg() {
    console.log('=================================');
    console.log('Building BIS Aluminum Management');
    console.log('=================================\n');

    try {
        // Step 1: Clean previous builds
        console.log('📦 Step 1/4: Cleaning previous builds...');
        const dirsToClean = ['.next', 'dist', 'build-manifest.json'];
        for (const dir of dirsToClean) {
            const dirPath = path.join(__dirname, '..', dir);
            if (fs.existsSync(dirPath)) {
                await fs.remove(dirPath);
                console.log(`✓ Removed: ${dir}`);
            }
        }

        // Step 2: Run Next.js build
        console.log('\n📦 Step 2/4: Building Next.js application...');
        console.log('This may take a few minutes...\n');

        await runCommand('npx', ['next', 'build'], {
            env: {
                ...process.env,
                NODE_ENV: 'desktopapp',
                NEXT_TELEMETRY_DISABLED: '1'
            }
        });

        // Step 3: Post-build
        console.log('\n📦 Step 3/4: Running post-build tasks...');
        const postBuildScript = path.join(__dirname, 'post-build.js');
        await runCommand('node', [postBuildScript]);

        // Step 4: Package with Pkg
        console.log('\n📦 Step 4/4: Creating executable with Pkg...');
        console.log('This may take several minutes...\n');

        await runCommand('npx', [
            'pkg',
            '.',
            '--targets',
            'node18-win-x64',
            '--compress',
            'GZip',
            '--output',
            'dist/bis-aluminum-management.exe'
        ]);

        console.log('\n=================================');
        console.log('✅ Build completed successfully!');
        console.log('=================================');
        console.log('\nExecutable location: dist/bis-aluminum-management.exe');
        console.log('\nTo run the app:');
        console.log('  cd dist');
        console.log('  .\\bis-aluminum-management.exe\n');

    } catch (error) {
        console.error('\n=================================');
        console.error('❌ Build failed!');
        console.error('=================================');
        console.error('\nError:', error.message);
        console.error('\nTry running individual steps:');
        console.error('  1. npm run build');
        console.error('  2. node scripts/post-build.js');
        console.error('  3. npx pkg . --targets node18-win-x64\n');
        process.exit(1);
    }
}

buildForPkg();