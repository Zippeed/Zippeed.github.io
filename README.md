# P//SHADOW — Zipped

Site pessoal estático, responsivo e compatível com GitHub Pages. A identidade Shadow continua presente, com navegação acessível, quatro idiomas e player sob demanda.

## Rodar localmente

Requer Node.js 22 ou superior. Não é necessário instalar dependências.

```sh
npm run dev
```

Abra `http://127.0.0.1:4173`. O servidor de desenvolvimento evita cache e suporta requisições parciais para navegar pela música.

## Verificar e preparar o upload

```sh
npm run verify
```

Executa as verificações de referências, sintaxe e traduções; os testes do player; e gera `dist/`. Publique **o conteúdo de `dist/`** na raiz do GitHub Pages. Também é possível dar dois cliques em `preparar-upload.bat`.

Os comandos individuais são `npm run check`, `npm test` e `npm run build`. Para conferir o pacote: `node scripts/serve.js --dist`.

## Estrutura

- `index.html`: estrutura, metadados e diálogos nativos.
- `app.js`: navegação por hash, preferências, teclado, Last.fm e interações.
- `data.js`: conteúdo pessoal e traduções de PT, EN, ES e JA. Edite aqui suas informações, afinidades e setup.
- `ui.js`: textos dos controles, escape de HTML e armazenamento tolerante a falhas.
- `renderers.js`: apresentação das seções; iframes só carregam ao abrir playlists.
- `audio.js`: player com carregamento sob demanda, avanço automático, volume, mute e proteção contra eventos de faixas antigas.
- `icons.js`: SVGs locais; sem fontes de ícones.
- `styles.css`: CSS nativo com tokens, Grid, breakpoints e respeito a movimento reduzido.
- `sw.js`: cache offline versionado; áudio e requisições parciais não entram no cache.
- `tests/`: testes com o runner nativo do Node.

A página usa módulos ES nativos. Abra por HTTP, pois navegadores restringem módulos em `file://`. Nenhum React, bundler ou CDN é necessário para esta página. Arquivos legados de Tailwind e efeitos antigos permanecem no checkout, mas não são carregados e não entram na publicação.

## Interações

Os links das seções e categorias funcionam com o histórico do navegador. O idioma e o volume persistem quando o armazenamento estiver disponível. O áudio começa apenas por ação da pessoa; mudar de faixa com o player pausado mantém a pausa. A galeria usa um diálogo com Escape, setas e retorno de foco. Efeitos decorativos são opcionais e respeitam `prefers-reduced-motion`.

As sete esmeraldas e o código Konami ativam o modo Super Shadow; o botão de retorno restaura o modo normal. Três cliques rápidos no avatar ou na marca abrem All Hail Shadow no player.

O Last.fm depende da API externa e não impede o restante do site de funcionar. Playlists dependem do Spotify. Offline, o terminal e imagens já visitadas continuam disponíveis após a primeira visita em produção; músicas e iframes exigem conexão.

Ao publicar mudanças futuras, altere a versão `CACHE` de `sw.js`. O build copia apenas os assets referenciados. As músicas são os maiores arquivos do pacote e não baixam no carregamento inicial. As coleções usam miniaturas WebP locais em `imagens/thumbs/`; o lightbox carrega o original apenas ao ampliar. Ao adicionar uma imagem a `data.js`, inclua também sua miniatura no mesmo caminho relativo dentro de `imagens/thumbs/`.
