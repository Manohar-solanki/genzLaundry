const fs = require('fs');
const path = require('path');

console.log('--- Copying static HTML and assets to dist/ ---');

const rootFiles = fs.readdirSync(__dirname);

// Copy all static HTML pages (except index.html which Vite builds, and backups)
rootFiles.forEach(file => {
  if (file.endsWith('.html') && file !== 'index.html' && !file.includes('original-daytime')) {
    const src = path.join(__dirname, file);
    const dest = path.join(__dirname, 'dist', file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> dist/`);
  }
});

// Copy root folders like catalog/, catalogue/
['catalog', 'catalogue'].forEach(folder => {
  const srcDir = path.join(__dirname, folder);
  const destDir = path.join(__dirname, 'dist', folder);
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log(`Copied ${folder}/ -> dist/${folder}/`);
  }
});

// Copy critical root files
['_redirects', 'robots.txt', 'sitemap.xml', 'logo.png', 'Location_qr.png'].forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(__dirname, 'dist', file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> dist/`);
  }
});

// Ensure images and public folders exist in dist
if (fs.existsSync('public/images')) {
  fs.cpSync('public/images', 'dist/images', { recursive: true });
  console.log('Copied public/images -> dist/images');
}

console.log('All static assets copied to dist/ successfully.');
