import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { staticData, languageData } from '../data.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const required = ['index.html','styles.css','app.js','data.js','icons.js','ui.js','renderers.js','audio.js','sw.js','manifest.json','404.html','robots.txt','sitemap.xml'];
for (const file of required) if (!fs.existsSync(path.join(root,file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
const scripts = fs.readdirSync(root).filter(f => f.endsWith('.js')).concat(fs.readdirSync(path.join(root,'scripts')).filter(f => f.endsWith('.js')).map(f => `scripts/${f}`));
for (const file of scripts) {
  try { execFileSync(process.execPath, ['--check', path.join(root,file)], { stdio: 'pipe' }); }
  catch (error) { errors.push(`JavaScript inválido em ${file}: ${error.stderr?.toString() || error.message}`); }
}
for (const file of ['package.json','manifest.json']) {
  try { JSON.parse(fs.readFileSync(path.join(root,file),'utf8').replace(/^\uFEFF/,'')); }
  catch (error) { errors.push(`JSON inválido: ${file}: ${error.message}`); }
}
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const tag of ['<head>','</head>','<body>','</body>','</html>']) if (html.split(tag).length !== 2) errors.push(`Esperado um ${tag}.`);
if (/user-scalable=no|maximum-scale=1/.test(html)) errors.push('Zoom não pode ser bloqueado.');
if (/cdn\.tailwindcss|cdnjs|fonts\.googleapis/.test(html)) errors.push('Dependência visual externa inesperada.');
if (!html.includes('type="module" src="app.js"')) errors.push('Entrada ESM ausente.');
const assets = new Set();
for (const file of required.filter(f => /\.(html|css|js)$/.test(f))) {
  const source = fs.readFileSync(path.join(root,file),'utf8');
  const matches = source.match(/(?:\.\/)?(?:audio|imagens)\/[A-Za-z0-9_./%() -]+\.(?:avif|gif|jpe?g|mp3|ogg|png|svg|webp)/g) || [];
  matches.forEach(asset => assets.add(asset.replace(/^\.\//,'')));
  for (const match of source.matchAll(/(?:from\s+|(?:src|href)=)["'](\.\/?[^"']+\.(?:js|css))["']/g)) {
    if (!fs.existsSync(path.join(root,match[1]))) errors.push(`Import/asset ausente em ${file}: ${match[1]}`);
  }
}
staticData.affinities.flatMap(c => c.items).filter(i => i.image).forEach(i => assets.add(i.image.replace(/^\.\//,'')));
staticData.gallery.forEach(a => assets.add(a.replace(/^\.\//,'')));
for (const asset of [...assets]) {
  if (asset.startsWith('imagens/') && asset.endsWith('.webp') && !asset.includes('/thumbs/') && !/perfil|shadow-hero|super-shadow|black-arms/.test(asset)) assets.add(asset.replace('imagens/','imagens/thumbs/'));
}
for (const asset of assets) if (!fs.existsSync(path.join(root,asset))) errors.push(`Arquivo referenciado ausente: ${asset}`);
for (const [lang,t] of Object.entries(languageData)) {
  if (t.affinities.categories.length !== staticData.affinities.length) errors.push(`Categorias incompatíveis: ${lang}`);
  if (t.profile.setup.length !== staticData.setup.length) errors.push(`Setup incompatível: ${lang}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verificado: ${scripts.length} scripts, 4 idiomas e ${assets.size} assets locais.`);
