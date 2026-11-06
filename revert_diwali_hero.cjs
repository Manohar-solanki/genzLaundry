/**
 * Revert Diwali Hero Background & Code to Original Daytime Theme
 * Run: node revert_diwali_hero.cjs
 */
const fs = require('fs');

console.log('--- REVERTING DIWALI HERO BACK TO ORIGINAL DAYTIME THEME ---');

// 1. Restore images
const filesToRestore = [
  {
    backup: 'public/images/hero-traveler-desktop.original-daytime.jpg',
    targets: [
      'public/images/hero-traveler-desktop.jpg',
      'public/images/hero-traveler-jodhpur.jpg',
      'dist/images/hero-traveler-desktop.jpg',
      'dist/images/hero-traveler-jodhpur.jpg',
      'dist/assets/hero-traveler-jodhpur-BnjTbX8h.jpg'
    ]
  },
  {
    backup: 'public/images/hero-traveler-mobile.original-daytime.jpg',
    targets: [
      'public/images/hero-traveler-mobile.jpg',
      'dist/images/hero-traveler-mobile.jpg'
    ]
  }
];

let restoredCount = 0;

for (const item of filesToRestore) {
  if (!fs.existsSync(item.backup)) {
    console.warn(`[SKIP] Backup not found: ${item.backup}`);
    continue;
  }
  for (const tgt of item.targets) {
    try {
      fs.copyFileSync(item.backup, tgt);
      console.log(`[RESTORED] ${item.backup} -> ${tgt}`);
      restoredCount++;
    } catch (e) {}
  }
}

// 2. Restore HTML & CSS
function restoreCodeFile(backup, target) {
  if (fs.existsSync(backup)) {
    fs.copyFileSync(backup, target);
    console.log(`[RESTORED CODE] ${backup} -> ${target}`);
  }
}

restoreCodeFile('index.html.original-daytime', 'index.html');
restoreCodeFile('dist/index.html.original-daytime', 'dist/index.html');
restoreCodeFile('css/blue-city-theme.css.original-daytime', 'css/blue-city-theme.css');

console.log(`\nSuccessfully restored all ${restoredCount} image targets and code files to original daytime theme.`);
