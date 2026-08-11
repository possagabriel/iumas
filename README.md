# Lumas Energia Solar — Portfólio

Landing page / portfólio profissional para a **Lumas Energia Solar** — limpeza, manutenção e
instalação de sistemas fotovoltaicos em Barbacena e região (MG).

Site **100% estático** (HTML + CSS + JS vanilla, sem dependências). Funciona abrindo o
`index.html` direto no navegador ou servindo a pasta.

## Rodar localmente

```bash
cd lumas-energia-solar
python3 -m http.server 8000
# abra em http://localhost:8000
```

> **Importante:** abra sempre via servidor (`http://localhost:8000`), não por duplo clique,
> para que o mapa e as imagens carreguem sem restrições.

## Estrutura

```
lumas-energia-solar/
├── index.html            → Estrutura semântica da página
├── css/
│   ├── style.css         → Design system (tokens, botões, forms, header)
│   ├── sections.css      → Estilo de cada seção (hero, portfólio, modal…)
│   ├── animations.css    → Fade-in (IntersectionObserver) + reduced-motion
│   └── responsive.css    → Ajustes mobile-first (640/768/1024+)
├── js/
│   ├── data.js           → ⚙️ TODOS OS DADOS EDITÁVEIS DO SITE
│   ├── whatsapp.js       → Monta os links do WhatsApp (mensagem + número)
│   └── main.js           → Render do portfólio, filtros, modal, galeria,
│                           antes/depois, menu, scrollspy, formulário
├── assets/
│   ├── images/           → Placeholders SVG (veja como trocar abaixo)
│   ├── icons/favicon.svg → Favicon
│   └── fonts/            → (opcional) fontes locais
├── robots.txt
└── sitemap.xml
```

## Como trocar as imagens (placeholder → foto real)

Hoje o site usa **placeholders SVG** em `assets/images/`. Para usar as fotos reais:

1. Coloque as fotos em `assets/images/portfolio/` (WebP recomendado, ~1200px de largura).
2. Atualize o caminho no projeto correspondente em `js/data.js` → `projects[].images`.

Exemplo:

```js
// js/data.js
{
  id: 'limpeza-modulos-1',
  title: 'Limpeza de módulos fotovoltaicos',
  category: 'limpeza',
  description: 'Descrição real do trabalho executado.',
  location: 'Barbacena, MG',   // deixe null se não souber
  images: ['assets/images/portfolio/limpeza-1.webp']
}
```

- **Para adicionar um trabalho novo:** copie um item do array `projects` e troque os campos.
  O card, o filtro e o modal são gerados automaticamente.
- **Antes/Depois:** troque `assets/images/before-after/before.svg` e `after.svg` pelas fotos
  reais (mesma proporção, ~1000×640 recomendado).
- **Hero/Sobre:** troque `hero-main.svg` e `about.svg`.
- **Instagram:** os itens ficam em `instagramItems` (recomendado quadrado, 600×600+).

> Não é preciso alterar HTML, CSS ou JS para gerenciar conteúdo: **tudo está em `data.js`**.

## Google Maps

O endereço exato da empresa não foi informado e **não foi inventado**. O mapa usa o
**embed sem chave** do Google Maps apontando para *Barbacena, MG*, com o local configurável:

- `js/data.js` → `site.mapQuery` (cidade/bairro) e `site.mapEmbedSrc`.

Se no futuro precisar da **API oficial do Google Maps**, a chave **nunca** deve ir para o
frontend. Configure `GOOGLE_MAPS_API_KEY` como variável de ambiente em um backend simples
(ex.: função serverless) e gere o tile/embed do lado servidor — o frontend consome apenas a
URL pública resultante.

## WhatsApp

- Número e mensagem padrão: `js/data.js` → `site.phoneIntl` / `site.whatsappMessage`.
- Todos os botões com o atributo `data-wa-link` são configurados automaticamente.
- O **formulário** valida no cliente e, ao enviar, abre o WhatsApp com a mensagem montada
  com os dados preenchidos. Para gravar os leads em banco, adicione um endpoint próprio e
  mantenha validação também no servidor (este projeto é estático, sem backend).

## SEO

No `<head>` do `index.html` e nos arquivos raiz:

- `title`, `meta description`, `canonical`
- Open Graph + Twitter Card
- **Dados estruturados** Schema.org `LocalBusiness`
- `robots.txt` e `sitemap.xml`

> Antes de publicar, troque `https://lumas-energia-solar.example.com` pelo **domínio real** em:
> `index.html` (canonical, OG, JSON-LD) · `data.js` (`site.url`) · `robots.txt` · `sitemap.xml`.
> A mesma URL também vale para `og:image` — use a foto da hero com caminho absoluto.

## Identidade visual

Paleta extraída da referência da marca: **fundo near-black `#161615`**, texto cream `#F6F3EE`,
detalhes dourados `#BEA580` / `#ECE2CB`. Fonte: **Inter**.

## Deploy (gratuito)

- **Netlify:** arraste a pasta em <https://app.netlify.com/drop>.
- **Vercel:** `npx vercel` na raiz (framework: *Other*).
- **GitHub Pages:** suba a pasta para um repositório e ative o Pages.

## Checklist de qualidade

Responsividade ✓ · Navegação/âncoras ✓ · WhatsApp (CTAs + flutuante) ✓ · Galeria com filtros ✓ ·
Modal acessível + lightbox ✓ · Antes/Depois (toque + teclado) ✓ · Acessibilidade (WCAG 2.2,
`prefers-reduced-motion`) ✓ · SEO ✓ · Performance (lazy loading, `width`/`height`, WebP ao trocar
fotos) ✓ · Sem informações inventadas ✓ · Sem chaves no código ✓ · Dados centralizados em `data.js` ✓