/**
 * Revert Diwali Hero Background & Code to Original Daytime Theme (with user inspiration assets)
 * Run: node revert_diwali_hero.cjs
 */
const { execSync } = require('child_process');

console.log('--- REVERTING DIWALI HERO BACK TO ORIGINAL DAYTIME THEME ---');

require('./scratch/restore_daytime_hero.cjs');
require('./scratch/update_to_daytime_inspiration.cjs');
require('./copy_static_to_dist.cjs');

console.log('\nSuccessfully restored original daytime theme matching inspiration images.');
