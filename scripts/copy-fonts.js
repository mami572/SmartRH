// scripts/copy-fonts.js
const fs = require('fs');
const path = require('path');

// ⚡ Chemins
const sourceDir = path.join(require('os').homedir(), 'Downloads', 'SpaceMono'); // dossier où sont les TTF
const targetDir = path.join(__dirname, '..', 'public', 'fonts', 'SpaceMono');   // destination dans le projet
const globalsCss = path.join(__dirname, '..', 'app', 'globals.css');           // fichier CSS global

// Crée le dossier cible s'il n'existe pas
fs.mkdirSync(targetDir, { recursive: true });

// Copie les fichiers TTF
const fonts = fs.readdirSync(sourceDir).filter(f => f.endsWith('.ttf'));
fonts.forEach(file => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
  console.log(`Copié: ${file}`);
});

// Génère le code @font-face pour globals.css
let cssContent = fonts.map(file => {
  let weight = 400;
  let style = 'normal';

  if (file.toLowerCase().includes('bold')) weight = 700;
  if (file.toLowerCase().includes('italic')) style = 'italic';

  return `@font-face {
  font-family: 'Space Mono';
  src: url('/fonts/SpaceMono/${file}') format('truetype');
  font-weight: ${weight};
  font-style: ${style};
}`;
}).join('\n\n');

// Ajoute body { font-family } si absent
cssContent += `\n\nbody { font-family: 'Space Mono', monospace; }`;

// Écrit dans globals.css
fs.writeFileSync(globalsCss, cssContent, 'utf8');
console.log('globals.css mis à jour avec Space Mono!');