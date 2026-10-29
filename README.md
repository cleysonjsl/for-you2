# For You.exe — Hoje, o mundo celebra você

Site estático (HTML + CSS + JavaScript puros). Sem backend, sem coleta de dados, sem serviços externos.

## 1. Organização dos arquivos
```
for-you/
├── index.html
├── style.css
├── script.js        ← textos e caminhos para personalizar (topo do arquivo)
├── README.md
└── assets/
    ├── images/  foto1.jpg  foto2.jpg  foto3.jpg
    └── audio/   musica.mp3
```
Os arquivos de foto e música **não vêm prontos**: você adiciona. Enquanto não existirem, aparecem espaços reservados e o botão de música avisa com delicadeza.

## 2. Testar localmente
Dê dois cliques em `index.html` (abre no navegador). Ou, com Python instalado: `python -m http.server 8000` dentro da pasta e acesse `http://localhost:8000`.

## 3. Trocar as fotografias
Salve suas fotos em `assets/images/` como `foto1.jpg`, `foto2.jpg`, `foto3.jpg` (substituindo os nomes). Pode usar qualquer proporção: a moldura é quadrada e a foto é recortada ao centro automaticamente. Dica: use imagens de até ~1200 px e menos de 500 KB para carregar rápido. Para usar outros nomes/formatos (ex.: `.png`), altere `src` em `CONFIG.fotos` no `script.js`.

## 4. Adicionar a música
Só use um arquivo que você tenha autorização para usar. Coloque-o em `assets/audio/musica.mp3` (ou mude `CONFIG.musica`). A música só toca quando ela tocar no botão ♪ no canto da tela. Sem o arquivo, o site funciona normalmente.

## 5. Personalizar textos
Abra `script.js` e edite o bloco **PERSONALIZE AQUI**: apelido (`apelido`), seu nome (`remetente`), legendas das fotos, carta, texto final e caminho da música. Mantenha as aspas e as crases ( ` ) ao redor da carta.

## 6. Publicar de graça (GitHub Pages)
1. Crie uma conta em github.com e um repositório **público** novo (ex.: `for-you`).
2. Clique em *Add file → Upload files* e envie todo o conteúdo da pasta (inclusive `assets`). Confirme com *Commit changes*.
3. Vá em *Settings → Pages*. Em *Source*, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`, e salve.
4. Aguarde 1–3 minutos.

Alternativas gratuitas: Netlify Drop (app.netlify.com/drop — arraste a pasta) ou Cloudflare Pages.

## 7. Obter o link
No GitHub Pages, o link aparece em *Settings → Pages* e costuma ser `https://SEU-USUARIO.github.io/for-you/`. Atenção: repositório público = fotos públicas para quem tiver o link do repositório.

## 8. Testar no celular antes de enviar
Abra o link público no seu celular (Chrome/Safari). Confira: os 5 passos na ordem, toque nas fotos para ampliar, toque na carta para revelar o texto completo, botão de música e rotação da tela. Se algo antigo aparecer, atualize a página ou abra em aba anônima (o cache pode demorar).
