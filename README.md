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
│   ├── responsive.css    → Ajustes mobile-first (640/768/1024+)
│   └── visual.css        → Identidade visual atual e ajustes responsivos finais
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

O portfólio, a seção Sobre e o Instagram usam **placeholders SVG** em `assets/images/`.
A abertura usa uma foto ilustrativa do setor (`solar-hero.webp`), com crédito em
`assets/images/CREDITOS.md`. Ela não representa uma obra da Lumas. Para usar as fotos reais:

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
- **Antes/Depois:** as fotos do comparador ficam em `assets/images/before-after/antes.jpg` e `depois.jpg`
  (mesmo enquadramento e tamanho, recomendado ~1200px). Atualize os caminhos em `js/data.js` → `beforeAfter`.
- **Hero:** substitua `solar-hero.webp` ou atualize o `src` da imagem em `index.html`.
- **Sobre:** troque `about.svg` ou atualize seu `src` em `index.html`.
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

Estilo **clean, corporativo e moderno**, com fundos claros, títulos amplos e chamadas em
amarelo solar. A apresentação final está centralizada em `css/visual.css`, carregado
depois dos estilos estruturais. As seções, textos, categorias e dados comerciais originais
foram preservados; `js/data.js` permanece inalterado.

| Uso | Cor |
| --- | --- |
| Títulos e texto principal | Azul profundo `#142F3B` |
| Chamadas de orçamento e detalhes solares | Amarelo `#F5BD3D` |
| WhatsApp, links e ícones | Verde `#176249` |
| Abertura e seção de resultados | Verde profundo `#103A31` |
| Superfícies | Branco `#FFFFFF` e cinza esverdeado `#F2F6F5` |

**Manrope** nos títulos e **Inter** nos textos e controles, com fontes de sistema como
alternativa. As animações respeitam a preferência de movimento reduzido. Os placeholders
foram ajustados à paleta, preservando seus textos, e as duas fotos do comparador não foram
alteradas. Os nove cases permanecem em cards filtráveis; não há depoimentos cadastrados.

## Deploy (gratuito)

- **Netlify:** arraste a pasta em <https://app.netlify.com/drop>.
- **Vercel:** `npx vercel` na raiz (framework: *Other*).
- **GitHub Pages:** suba a pasta para um repositório e ative o Pages.

## Checklist de qualidade

Responsividade ✓ · Navegação/âncoras ✓ · WhatsApp (CTAs + flutuante) ✓ · Galeria com filtros ✓ ·
Modal acessível + lightbox ✓ · Antes/Depois (toque + teclado) ✓ · Acessibilidade (WCAG 2.2,
`prefers-reduced-motion`) ✓ · SEO ✓ · Performance (lazy loading, `width`/`height`, WebP ao trocar
fotos) ✓ · Sem informações inventadas ✓ · Sem chaves no código ✓ · Dados centralizados em `data.js` ✓
