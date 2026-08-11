/* ============================================================
   Lumas Energia Solar — data.js
   ⚙️ TODOS OS DADOS EDITÁVEIS DO SITE FICAM AQUI.
   Não precisa tocar em HTML/CSS/JS para atualizar conteúdo.

   IMAGENS: para trocar um placeholder, substitua o arquivo em
   assets/images/… ou atualize o caminho em `src`. Depois apague
   o arquivo .svg antigo (se não for mais usado).
   ============================================================ */

window.LUMAS = (function () {
  'use strict';

  /* ---------- Configurações gerais/navegação ---------- */
  const site = {
    name: "Lumas Energia Solar",
    shortName: "Lumas",
    subname: 'Energia Solar',
    tagline: 'Limpeza e manutenção para sua usina fotovoltaica.',
    area: 'Barbacena e região',

    // WhatsApp
    phoneDisplay: '(32) 98851-0149',
    phoneIntl: '5532988510149', // somente números, com DDI 55
    whatsappMessage:
      'Olá! Vi o portfólio da Lumas Energia Solar e gostaria de solicitar um orçamento.',

    // Instagram
    instagram: '@manutencoes_fotovoltaicas_',
    instagramUrl: 'https://www.instagram.com/manutencoes_fotovoltaicas_/',

    // Google Maps — o endereço exato não foi informado.
    // Ajuste `mapQuery` (cidade/bairro) ou troque `mapEmbedSrc`.
    mapQuery: 'Barbacena, MG',
    mapEmbedSrc:
      'https://www.google.com/maps?q=Barbacena,+MG&z=12&output=embed',

    // Usado no schema.org (LocalBusiness). Não inventar endereço:
    // preencha apenas se a empresa tiver endereço fixo.
    address: {
      street: null, // ex.: 'Rua X, 123'
      locality: 'Barbacena',
      region: 'MG'
    },

    // Domínio oficial (canonical/sitemap). Troque pelo domínio real.
    url: 'https://lumas-energia-solar.example.com',

    nav: [
      { label: 'Início', href: '#inicio' },
      { label: 'Serviços', href: '#servicos' },
      { label: 'Portfólio', href: '#portfolio' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'Contato', href: '#contato' }
    ]
  };

  /* ---------- Serviços ---------- */
  const services = [
    {
      id: 'limpeza',
      title: 'Limpeza de usinas fotovoltaicas',
      description:
        'Higienização de módulos, estrutura e inversores para manter a usina em boas condições de geração.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v3M5.5 5l2 2M18.5 5l-2 2M3 12h3M18 12h3M7 19l4-4 2 2 4-4" stroke="#BEA580"/><path d="M9 20.5c-2.5-4 5-7 6-11 1.5 3 3.5 6.5 3.5 9A3.5 3.5 0 0 1 15 22c-1.9 0-3.4-1.2-4.6-3M12 14l4 2" stroke="#BEA580"/></svg>'
    },
    {
      id: 'manutencao',
      title: 'Manutenção fotovoltaica',
      description:
        'Inspeção periódica do sistema fotovoltaico para identificar e corrigir falhas com segurança.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/></svg>'
    },
    {
      id: 'instalacao',
      title: 'Instalação de sistemas',
      description:
        'Instalação de sistemas fotovoltaicos com bom acabamento, estrutura firme e segurança.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="10" rx="1.5"/><path d="M3 13h18M3 8h18M6 16l1.5 5M18 16l-1.5 5M9 21h6M8 16v5M16 16v5" stroke="currentColor"/></svg>'
    },
    {
      id: 'geral',
      title: 'Manutenção em geral',
      description:
        'Serviços diversos de manutenção elétrica e reparos nos componentes do sistema.',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L3 17.6V21h3.4l5.7-5.7a4.5 4.5 0 0 0 5.6-6L14.5 12l-2.5-2.5z"/></svg>'
    }
  ];

  /* ---------- Portfólio ----------
     Cada projeto: { title, category, description, location, images }
     - category: 'limpeza' | 'manutencao' | 'instalacao'
     - location: `null` enquanto não for informada
     - images: [src, src, …] — adicione quantas fotos o projeto tiver
     Para incluir um novo trabalho, basta adicionar um objeto aqui. */
  const categoryLabels = {
    limpeza: 'Limpeza',
    manutencao: 'Manutenção',
    instalacao: 'Instalação'
  };

  const projects = [
    {
      id: 'limpeza-modulos-1',
      title: 'Limpeza de módulos fotovoltaicos',
      category: 'limpeza',
      description:
        'Serviço de limpeza realizado nos módulos do sistema para remover acúmulo de sujeira e manter a geração em boas condições.',
      location: null,
      images: ['assets/images/portfolio/portfolio-1.svg']
    },
    {
      id: 'higienizacao-usina-1',
      title: 'Higienização de usina fotovoltaica',
      category: 'limpeza',
      description:
        'Higienização geral de usina fotovoltaica, incluindo módulos e área de instalação.',
      location: null,
      images: ['assets/images/portfolio/portfolio-2.svg']
    },
    {
      id: 'limpeza-sistema-1',
      title: 'Limpeza de sistema fotovoltaico',
      category: 'limpeza',
      description:
        'Limpeza de sistema fotovoltaico residencial com atenção aos detalhes e segurança.',
      location: null,
      images: ['assets/images/portfolio/portfolio-3.svg']
    },
    {
      id: 'manutencao-preventiva-1',
      title: 'Manutenção preventiva do sistema',
      category: 'manutencao',
      description:
        'Verificação periódica dos componentes do sistema fotovoltaico para prevenir falhas.',
      location: null,
      images: ['assets/images/portfolio/portfolio-4.svg']
    },
    {
      id: 'manutencao-inversor-1',
      title: 'Manutenção de inversor',
      category: 'manutencao',
      description:
        'Serviço de manutenção e verificação de inversores para o bom funcionamento do sistema.',
      location: null,
      images: ['assets/images/portfolio/portfolio-5.svg']
    },
    {
      id: 'inspecao-estrutura-1',
      title: 'Inspeção de estrutura e fixações',
      category: 'manutencao',
      description:
        'Inspeção da estrutura e fixações dos módulos para garantir firmeza e segurança da instalação.',
      location: null,
      images: ['assets/images/portfolio/portfolio-6.svg']
    },
    {
      id: 'instalacao-sistema-1',
      title: 'Instalação de sistema fotovoltaico',
      category: 'instalacao',
      description:
        'Instalação de sistema fotovoltaico com estrutura bem fixada, cabeamento organizado e acabamento cuidadoso.',
      location: null,
      images: ['assets/images/portfolio/portfolio-7.svg']
    },
    {
      id: 'instalacao-usina-1',
      title: 'Instalação de usina fotovoltaica',
      category: 'instalacao',
      description:
        'Instalação de usina fotovoltaica seguindo as boas práticas para os módulos e demais componentes.',
      location: null,
      images: ['assets/images/portfolio/portfolio-8.svg']
    },
    {
      id: 'instalacao-residencial-1',
      title: 'Instalação de sistema residencial',
      category: 'instalacao',
      description:
        'Instalação de sistema fotovoltaico residencial, do planejamento da posição dos módulos ao acabamento final.',
      location: null,
      images: ['assets/images/portfolio/portfolio-9.svg']
    }
  ];

  /* ---------- Antes / Depois ---------- */
  const beforeAfter = {
    caption: 'Resultado após a limpeza',
    before: {
      src: 'assets/images/before-after/antes.jpg',
      alt: 'Módulos fotovoltaicos antes da limpeza'
    },
    after: {
      src: 'assets/images/before-after/depois.jpg',
      alt: 'Módulos fotovoltaicos depois da limpeza'
    }
  };

  /* ---------- Instagram ---------- */
  const instagramItems = [
    { src: 'assets/images/instagram-1.svg', alt: 'Trabalho de limpeza fotovoltaica publicado no Instagram' },
    { src: 'assets/images/instagram-2.svg', alt: 'Trabalho de manutenção fotovoltaica publicado no Instagram' },
    { src: 'assets/images/instagram-3.svg', alt: 'Instalação fotovoltaica publicada no Instagram' },
    { src: 'assets/images/instagram-4.svg', alt: 'Trabalho fotovoltaico publicado no Instagram' }
  ];

  /* ---------- Formulário: opções de serviço ---------- */
  const formServices = [
    'Limpeza de usina fotovoltaica',
    'Manutenção fotovoltaica',
    'Instalação de sistema',
    'Manutenção em geral',
    'Outro'
  ];

  return {
    site,
    services,
    categoryLabels,
    projects,
    beforeAfter,
    instagramItems,
    formServices
  };
})();