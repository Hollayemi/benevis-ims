// scripts/post-build-electron.js
const fs = require('fs-extra');
const path = require('path');

async function postBuildElectron() {
    console.log('\n=================================');
    console.log('Post-build for Electron');
    console.log('=================================\n');

    const rootPath = path.join(__dirname, '..');
    const standalonePath = path.join(rootPath, '.next/standalone');
    const publicPath = path.join(rootPath, 'public');
    const staticPath = path.join(rootPath, '.next/static');

    try {
        // Copy public folder to standalone
        console.log('📦 Copying public folder to standalone...');
        await fs.copy(
            publicPath,
            path.join(standalonePath, 'public')
        );
        console.log('✓ Copied public folder');

        // Copy static folder to standalone
        console.log('📦 Copying static folder to standalone...');
        await fs.copy(
            staticPath,
            path.join(standalonePath, '.next/static')
        );
        console.log('✓ Copied static folder');

        // Create a minimal package.json for standalone
        console.log('📦 Creating standalone package.json...');
        const standalonePackage = {
            name: "bis-aluminum-management",
            version: "1.0.0",
            private: true,
            scripts: {
                start: "node server.js"
            }
        };

        await fs.writeJson(
            path.join(standalonePath, 'package.json'),
            standalonePackage,
            { spaces: 2 }
        );
        console.log('✓ Created package.json');

        console.log('\n=================================');
        console.log('✅ Post-build completed!');
        console.log('=================================');
        console.log('\nNext steps:');
        console.log('Run: npm run electron:build');
        console.log('=================================\n');

    } catch (error) {
        console.error('\n❌ Post-build failed:', error);
        process.exit(1);
    }
}

postBuildElectron();