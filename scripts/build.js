import { mkdir, copyFile, stat, readFile, writeFile } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { staticData } from '../data.js';
const root=resolve('.'),out=join(root,'dist');
const files=['index.html','styles.css','app.js','data.js','icons.js','ui.js','renderers.js','audio.js','sw.js','manifest.json','404.html','robots.txt','sitemap.xml'];
const assets=new Set(staticData.affinities.flatMap(c=>c.items).filter(i=>i.image).map(i=>i.image.replace(/^\.\//,'')));
staticData.gallery.forEach(a=>assets.add(a.replace(/^\.\//,'')));
for(const asset of [...assets]) assets.add(asset.replace('imagens/','imagens/thumbs/'));
for(const file of files){
  const source=await readFile(join(root,file),'utf8');
  for(const asset of source.match(/(?:audio|imagens)\/[A-Za-z0-9_./%() -]+\.(?:avif|gif|jpe?g|mp3|ogg|png|svg|webp)/g)||[])assets.add(asset);
}
// Copy only assets referenced by the current site, never the old JPG/PNG archive.
// This output stays inside the checkout; no source files are removed.
await mkdir(out,{recursive:true});
let bytes=0;
for(const file of [...files,...assets]){
  await mkdir(dirname(join(out,file)),{recursive:true});
  await copyFile(join(root,file),join(out,file));
  bytes+=(await stat(join(root,file))).size;
}
await writeFile(join(out,'.nojekyll'),'');
const sources=await Promise.all(files.filter(f=>/\.(html|css|js)$/.test(f)).map(async f=>(await stat(join(root,f))).size));
console.log(`Build estático pronto: ${out}\n${files.length+assets.size+1} arquivos | ${(bytes/1024/1024).toFixed(1)} MB com as três músicas.\nHTML/CSS/JS: ${(sources.reduce((a,b)=>a+b,0)/1024).toFixed(1)} KB antes da compressão HTTP.`);
