import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// Deployment smoke checks: a successful build must produce the static site,
// not accidentally turn the local preview server into a production function.
const config = JSON.parse(readFileSync('vercel.json','utf8'));
if (config.framework !== null || config.outputDirectory !== 'dist' || config.functions || config.builds) {
  throw new Error('This business website must deploy as static files from dist.');
}
if (config.rewrites?.some(route => /server|api/.test(route.destination))) {
  throw new Error('Static page requests must not route through a server function.');
}
const html = readFileSync('dist/index.html','utf8');
if (!html.includes('Bhuran Karate Academy') || !html.includes('id="enquiry-form"')) throw new Error('Missing business page or enquiry form.');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const asset = match[1];
  if (/^(?:https?:|#|tel:|sms:|mailto:)/.test(asset)) continue;
  const file = resolve('dist',asset);
  if (!existsSync(file) || !statSync(file).size) throw new Error(`Missing or empty page asset: ${asset}`);
}
for (const file of ['dist/app.js','dist/site-config.js','scripts/preview.mjs']) {
  const result = spawnSync(process.execPath,['--check',file],{encoding:'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || `Invalid JavaScript: ${file}`);
}
console.log('PASS: static deployment configuration, business page, local assets and JavaScript.');
