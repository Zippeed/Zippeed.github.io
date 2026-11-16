import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
function worker(){
  const events={};const entries=new Map();const removed=[];
  const cache={addAll:async()=>{},put:async(req,res)=>entries.set(req.url,res),match:async req=>entries.get(typeof req==='string'?req:req.url),keys:async()=>[],delete:async()=>true};
  const context={URL,Response,Promise,self:{location:{origin:'https://example.com'},registration:{scope:'https://example.com/'},addEventListener:(type,fn)=>events[type]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}},caches:{open:async()=>cache,keys:async()=>['pshadow-v4','pshadow-v6.1','unrelated-cache'],delete:async key=>removed.push(key)},fetch:async()=>{throw new Error('offline');}};
  vm.runInNewContext(source,context);
  return {events,context,entries,removed};
}
function request(path,headers={}){return {url:'https://example.com/'+path,method:'GET',headers:new Headers(headers),mode:'cors'};}
test('service worker leaves audio, range and external requests to the browser',()=>{
  const {events}=worker();for(const req of [request('audio/normal.mp3'),request('styles.css',{range:'bytes=0-10'}),{...request('app.js'),url:'https://other.com/app.js'}]){let handled=false;events.fetch({request:req,respondWith:()=>handled=true});assert.equal(handled,false);}
});
test('offline navigation falls back to cached shell and missing assets return a real response',async()=>{
  const {events,entries}=worker();entries.set('./index.html',new Response('terminal'));
  let result;events.fetch({request:{...request(''),mode:'navigate'},respondWith:p=>result=p});assert.equal(await(await result).text(),'terminal');
  events.fetch({request:request('imagens/gallery/missing.webp'),respondWith:p=>result=p});assert.equal((await result).status,503);
});
test('online code prefers fresh network content to cached code',async()=>{
  const {events,context,entries}=worker();entries.set('https://example.com/app.js',new Response('old'));
  context.fetch=async()=>new Response('fresh');let result;events.fetch({request:request('app.js'),respondWith:p=>result=p});assert.equal(await(await result).text(),'fresh');
});
test('activation removes only older caches owned by this site',async()=>{
  const {events,removed}=worker();let pending;events.activate({waitUntil:p=>pending=p});await pending;assert.deepEqual(removed,['pshadow-v4']);
});
