const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const errors = [];

function fail(message) {
    errors.push(message);
}

function read(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const requiredFiles = [
    'index.html',
    'styles.css',
    'tailwind.css',
    'manifest.json',
    'sw.js',
    'robots.txt',
    'sitemap.xml',
];

for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(root, file))) {
        fail(`Arquivo obrigatório ausente: ${file}`);
    }
}

const jsFiles = fs.readdirSync(root)
    .filter(file => file.endsWith('.js'))
    .concat('scripts/check-project.js');

for (const file of jsFiles) {
    try {
        execFileSync(process.execPath, ['--check', path.join(root, file)], {
            stdio: 'pipe',
        });
    } catch (error) {
        const details = error.stderr?.toString().trim() || error.message;
        fail(`JavaScript inválido em ${file}:\n${details}`);
    }
}

for (const file of ['package.json', 'manifest.json']) {
    try {
        JSON.parse(read(file));
    } catch (error) {
        fail(`JSON inválido em ${file}: ${error.message}`);
    }
}

if (fs.existsSync(path.join(root, 'index.html'))) {
    const html = read('index.html');
    const expectedOnce = ['<head>', '</head>', '<body>', '</body>', '</html>'];

    for (const tag of expectedOnce) {
        const count = html.split(tag).length - 1;
        if (count !== 1) fail(`index.html deve conter exatamente um ${tag}; encontrado: ${count}`);
    }

    if (html.includes('cdn.tailwindcss.com')) {
        fail('O Tailwind CDN voltou ao index.html; use tailwind.css compilado.');
    }
}

const sourceFiles = fs.readdirSync(root)
    .filter(file => /\.(?:html|css|js|json)$/.test(file));
const assetPattern = /(?:\.\/)?(?:audio|imagens)\/[A-Za-z0-9_./%() -]+\.(?:avif|gif|jpe?g|mp3|ogg|png|svg|webp)/g;
const referencedAssets = new Set();

for (const file of sourceFiles) {
    const matches = read(file).match(assetPattern) || [];
    for (const match of matches) {
        referencedAssets.add(match.replace(/^\.\//, ''));
    }
}

for (const asset of referencedAssets) {
    if (!fs.existsSync(path.join(root, asset))) {
        fail(`Arquivo referenciado mas ausente: ${asset}`);
    }
}

if (errors.length) {
    console.error('\nFalha na verificação do projeto:\n');
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
}

console.log(`Projeto verificado: ${jsFiles.length} JS, 2 JSON e ${referencedAssets.size} arquivos referenciados.`);
