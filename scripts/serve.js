import { createServer } from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.webp':'image/webp', '.png':'image/png', '.mp3':'audio/mpeg', '.svg':'image/svg+xml', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8' };
const server = createServer((req,res) => {
  let file;
  try {
    const name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if (name.split('/').some(part => part.startsWith('.') && part !== '')) throw new Error('Invalid path');
    file = resolve(root,'.'+(name.endsWith('/') ? name+'index.html' : name));
    if (!file.startsWith(root+sep)) throw new Error('Outside root');
    const stat = statSync(file);
    if (!stat.isFile()) throw new Error('Not a file');
    const headers = { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'Accept-Ranges':'bytes', 'X-Content-Type-Options':'nosniff' };
    let start=0,end=stat.size-1,status=200;
    if (req.headers.range) {
      const match = req.headers.range.match(/^bytes=(\d*)-(\d*)$/);
      if (!match || (!match[1] && !match[2])) { res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return; }
      start = match[1] ? Number(match[1]) : Math.max(0,stat.size-Number(match[2]));
      end = match[1] && match[2] ? Math.min(Number(match[2]),end) : end;
      if (start>end || start>=stat.size) { res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return; }
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=end-start+1;
    res.writeHead(status,headers);
    if (req.method==='HEAD') { res.end(); return; }
    const stream=createReadStream(file,{start,end});
    stream.on('error',()=>res.destroy());stream.pipe(res);
  } catch { res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Não encontrado'); }
});
server.listen(port,'127.0.0.1',()=>console.log(`P//SHADOW: http://127.0.0.1:${port}`));
