# LoveStory — Instruções para Claude

## O que é este projeto
Site-presente para casais. O comprador customiza uma landing page (texto, fotos, música, datas) e envia a URL para o parceiro(a). MVP focado na landing page do presente; editor de customização é fase futura.

## Stack
- React + Vite + Tailwind CSS v4 (`@tailwindcss/vite` plugin — sem `tailwind.config.js`)
- `react-router-dom`, `framer-motion`, `@supabase/supabase-js`
- Fontes via Google Fonts: Playfair Display, Lato, Dancing Script

## Estrutura de pastas
```
src/
  components/
    LoadingSection.jsx    # Seção 1 — corações flutuantes, 2.5s, fade-out
    LetterSection.jsx     # Seção 2 — envelope SVG animado + carta expandida
    GallerySection.jsx    # Seção 3 — polaroids rotacionadas + fio vertical
    CounterSection.jsx    # Seção 4 — contador ao vivo (dias/horas/min/seg)
    FinalSection.jsx      # Seção 5 — tela final estilo player + botão compartilhar
    FloatingPlayer.jsx    # Player fixo que aparece após clicar no envelope
    YouTubePlayer.jsx     # iframe YouTube oculto (IFrame API) — gerencia o áudio
  hooks/
    useGiftData.js        # fetch Supabase por slug; slug='dev' retorna DEV_DATA
    useYouTubeMetadata.js # busca título e artista via YouTube oEmbed (sem API key)
  lib/
    supabase.js           # cliente Supabase (null se .env vazio)
  pages/
    GiftPage.jsx          # orquestrador: fetch + estado de música + renderização
  App.jsx                 # rotas: /p/:slug e /dev → /p/dev
  index.css               # @theme com design tokens e import das fontes
```

## Rotas
- `/p/:slug` — página do presente (produção)
- `/dev` — redireciona para `/p/dev`, usa DEV_DATA embutida no hook (sem Supabase)

## Design tokens (definidos no `@theme` do index.css)
```
cream: #FFF8F5      primary: #C2185B
accent: #F48FB1     text: #3E2723
```
Mobile-first: max-width 430px no `#root`, centralizado em desktop.

## Supabase — tabela `gifts`
Campos esperados: `slug`, `names`, `start_date`, `letter_text`, `music_url`, `photos` (JSONB array de `{ src, caption }`)
Campos `music_title` e `music_artist` **não são usados** — título e artista vêm do YouTube oEmbed em runtime.

## Música (YouTube)
- `YouTubePlayer.jsx` carrega o YouTube IFrame API e cria um player oculto (`position: fixed; top: -9999px`)
- Play é disparado por `player.playVideo()` no clique do envelope em `LetterSection`
- `GiftPage` gerencia `playerRef` e `pendingPlayRef` (race condition: clique antes do player estar pronto)
- Loop: `playerVars: { loop: 1, playlist: videoId }` + fallback no `onStateChange` (state ENDED → `playVideo()`)
- Metadados (título, artista) via `useYouTubeMetadata` → YouTube oEmbed sem API key

## Fluxo de estados em GiftPage
1. `appLoading: true` → renderiza só `LoadingSection` (2.5s + fade-out)
2. `loading: true` → aguarda fetch do Supabase
3. `error` → tela de erro com 💔
4. Estado normal → renderiza todas as seções
5. `musicStarted: true` → mostra `FloatingPlayer` + `paddingBottom: 88px`
6. `isPlaying` → controlado via `onPlaybackUpdate` do `YouTubePlayer`

## Convenções
- Estilos inline com `style={{}}` para valores dinâmicos ou que usam os design tokens do projeto
- Classes Tailwind para utilitários genéricos (`flex`, `min-h-screen`, `truncate`, etc.)
- Tamanhos responsivos com `clamp()` onde há risco de overflow em telas < 360px
- Animações de entrada com `framer-motion` (`whileInView` + `viewport: { once: true }`)
- Todo componente de seção é autossuficiente — recebe dados via props, sem estado global

## Desenvolvimento local
```bash
npm run dev       # acesse /dev para ver com dados de exemplo
npm run build     # verifica erros de compilação
```
O arquivo `.env` deve ter `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` para produção. Em dev, pode ficar vazio — o hook usa DEV_DATA.

## Sistema de Editions
O projeto suporta múltiplas edições temáticas via `VITE_EDITION`. Cada edição em `src/editions/{id}/config.js` define copy, assets e decorações específicas. O `EditionContext` distribui a config para os componentes via hook `useEdition()`. Edição atual: `valentines`.

Cada presente tem uma coluna `edition` na tabela `gifts` (default `'valentines'`). Queries de leitura (`useGiftData`), edição (`EditorPage`) e listagem (`DashboardPage`) filtram por `edition.id` lido do `useEdition()`. A edição é imutável depois da criação (o update não inclui `edition`). Sessões de auth do Supabase são por origin/subdomínio (não compartilhadas).

## Deploy multi-subdomínio
O projeto roda em duas instâncias Vercel a partir do mesmo repo Git:
- `lovestorybr.com` — projeto Vercel `lovestory`, `VITE_EDITION=valentines`
- `maes.lovestorybr.com` — projeto Vercel `lovestory-maes`, `VITE_EDITION=mothers-day`

Ambos compartilham Supabase, conta MP, e webhook (configurado em `www.lovestorybr.com/api/webhook`). A edição é gravada na criação do presente e usada como filtro em todas as queries. O frontend envia `return_url_base` (via `getEditionUrl`) no body do `/api/create-preference`; o backend valida contra `ALLOWED_URLS` antes de usar nas `back_urls` do MP.

Para criar uma nova edição futura:
1. Adicionar `src/editions/{id}/` com `config.js`, assets, decoration.
2. Registrar em `src/editions/index.js`.
3. Adicionar URL em `src/lib/editionUrls.js`.
4. Adicionar a nova URL env var em `ALLOWED_URLS` no `api/create-preference.js`.
5. Criar novo projeto Vercel com env vars correspondentes.
6. Configurar DNS do subdomínio.

## Preferências do desenvolvedor
- Iniciante em front-end/React — explicar conceitos novos antes do código
- Direto, sem analogias
- Público final: 16–24 anos, lançamento Dia dos Namorados
- Prioridade: mobile-first, experiência fluida, código simples
