// scripts/fix-pkg-cache.js - Manually download pkg binaries
const https = require('https');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading: ${url}`);
        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                return https.get(response.headers.location, (redirectResponse) => {
                    redirectResponse.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`✓ Downloaded to: ${dest}`);
                        resolve();
                    });
                }).on('error', reject);
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`✓ Downloaded to: ${dest}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function fixPkgCache() {
    console.log('=================================');
    console.log('Fixing Pkg Cache Manually');
    console.log('=================================\n');

    // Set PKG_CACHE_PATH
    const pkgCachePath = path.join(os.homedir(), '.pkg-cache');
    process.env.PKG_CACHE_PATH = pkgCachePath;

    console.log(`PKG_CACHE_PATH: ${pkgCachePath}\n`);

    // Create cache directory
    await fs.ensureDir(pkgCachePath);
    await fs.ensureDir(path.join(pkgCachePath, 'v3.4'));

    // Node.js versions to try
    const versions = [
        { version: '16.20.0', url: 'https://github.com/yao-pkg/pkg-binaries/releases/download/v3.4/fetched-v16.20.0-win-x64' },
        { version: '18.5.0', url: 'https://github.com/yao-pkg/pkg-binaries/releases/download/v3.4/fetched-v18.5.0-win-x64' },
    ];

    console.log('Attempting to download pkg binaries...\n');

    for (const { version, url } of versions) {
        try {
            const filename = `fetched-v${version}-win-x64`;
            const destPath = path.join(pkgCachePath, 'v3.4', filename);

            if (fs.existsSync(destPath)) {
                console.log(`✓ Already exists: ${filename}`);
                continue;
            }

            console.log(`Downloading Node ${version}...`);
            await downloadFile(url, destPath);
            console.log(`✓ Success: ${filename}\n`);
        } catch (error) {
            console.log(`✗ Failed: ${error.message}\n`);
        }
    }

    console.log('=================================');
    console.log('Cache setup complete!');
    console.log('=================================\n');
    console.log('Now run: pkg . --targets node16-win-x64 --output dist/bis-aluminum-management.exe\n');
}

fixPkgCache().catch(console.error);