/**
 * Apply Diwali Festive Celebration Hero Background & Code
 * Run: node apply_diwali_hero.cjs
 */
const fs = require('fs');

console.log('--- ACTIVATING DIWALI CELEBRATION HERO THEME ---');

const desktopSrc = 'public/images/hero-diwali-8k.jpg';
const mobileSrc = 'public/images/hero-traveler-mobile.jpg';

const desktopTargets = [
  'public/images/hero-traveler-desktop.jpg',
  'public/images/hero-traveler-jodhpur.jpg',
  'dist/images/hero-traveler-desktop.jpg',
  'dist/images/hero-traveler-jodhpur.jpg',
  'dist/assets/hero-traveler-jodhpur-BnjTbX8h.jpg'
];

const mobileTargets = [
  'dist/images/hero-traveler-mobile.jpg'
];

let appliedCount = 0;

for (const tgt of desktopTargets) {
  try {
    fs.copyFileSync(desktopSrc, tgt);
    console.log(`[APPLIED] ${desktopSrc} -> ${tgt}`);
    appliedCount++;
  } catch (e) {}
}

for (const tgt of mobileTargets) {
  try {
    fs.copyFileSync(mobileSrc, tgt);
    console.log(`[APPLIED] ${mobileSrc} -> ${tgt}`);
    appliedCount++;
  } catch (e) {}
}

// Re-run HTML & CSS updates
require('./scratch/update_index_diwali.cjs');
require('./scratch/update_action_rows.cjs');
require('./scratch/update_css_diwali.cjs');
require('./scratch/apply_transparency.cjs');
require('./scratch/update_chip_pill_css.cjs');
require('./scratch/update_action_rows_css.cjs');

console.log(`\nSuccessfully applied Diwali hero theme across all image and code targets.`);
