// scripts/post-build.js
const fs = require('fs-extra');
const path = require('path');

async function postBuild() {
  console.log('Starting post-build process...');

  const standalonePath = path.join(__dirname, '../.next/standalone');
  const publicPath = path.join(__dirname, '../public');
  const staticPath = path.join(__dirname, '../.next/static');

  try {
    // Copy public folder to standalone
    await fs.copy(
      publicPath,
      path.join(standalonePath, 'public')
    );
    console.log('✓ Copied public folder');

    // Copy static folder to standalone
    await fs.copy(
      staticPath,
      path.join(standalonePath, '.next/static')
    );
    console.log('✓ Copied static folder');

    console.log('Post-build completed successfully!');
  } catch (error) {
    console.error('Post-build failed:', error);
    process.exit(1);
  }
}

postBuild();