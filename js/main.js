/* ============================================================
   Lumas Energia Solar — main.js
   Menu, scrollspy, render de serviços/portfólio, filtros, modal,
   lightbox, antes/depois, revelação, formulário.
   ============================================================ */

(function () {
  'use strict';

  const D = window.LUMAS;

  /* ---------- Helpers ---------- */
  const $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  const $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  function setAriaCurrent(selector, id) {
    $$(selector).forEach(function (link) {
      const on = link.getAttribute('href') === '#' + id;
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  /* ---------- Render: serviços ---------- */
  function renderServices() {
    const grid = $('#services-grid');
    if (!grid) return;
    grid.innerHTML = D.services
      .map(function (s, i) {
        return (
          '<article class="card service-card reveal">' +
          '<span class="service-card__icon" aria-hidden="true">' + s.icon + '</span>' +
          '<h3>' + s.title + '</h3>' +
          '<p class="service-card__desc">' + s.description + '</p>' +
          '<a class="service-card__cta" href="#" data-wa-link data-wa-extra="Tenho interesse no serviço: ' + s.title + '.">' +
          'Solicitar orçamento' +
          '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          '</a>' +
          '</article>'
        );
      })
      .join('');
    // Animação em cascata ao entrar na tela (revelação)
    $$('#services-grid .reveal').forEach(function (el, i) {
      el.style.transitionDelay = i * 70 + 'ms';
    });
  }

  /* ---------- Render: portfólio ---------- */
  function renderPortfolio() {
    const grid = $('#portfolio-grid');
    if (!grid) return;

    D.projects.forEach(function (p) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'portfolio-card';
      card.dataset.category = p.category;
      card.setAttribute('aria-label', 'Ver detalhes: ' + p.title);

      card.innerHTML =
        '<span class="portfolio-card__media">' +
        '<img src="' + p.images[0] + '" alt="' + p.title + '" loading="lazy" width="800" height="600">' +
        '</span>' +
        '<span class="portfolio-card__body">' +
        '<span class="portfolio-card__title">' + p.title + '</span>' +
        '<span class="portfolio-card__cat">' + D.categoryLabels[p.category] + '</span>' +
        '<span class="portfolio-card__hint">Ver trabalho' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>' +
        '</span>' +
        '</span>';

      card.addEventListener('click', function () {
        openModal(p.id);
      });

      grid.appendChild(card);
    });
  }

  /* ---------- Filtros ---------- */
  function initFilters() {
    const bar = $('#portfolio-filters');
    if (!bar) return;

    const cats = ['todos', 'limpeza', 'manutencao', 'instalacao'];
    const labels = {
      todos: 'Todos',
      limpeza: 'Limpeza',
      manutencao: 'Manutenção',
      instalacao: 'Instalação'
    };

    cats.forEach(function (cat, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn';
      btn.textContent = labels[cat];
      btn.setAttribute('data-category', cat);
      btn.setAttribute('aria-pressed', cat === 'todos' ? 'true' : 'false');
      bar.appendChild(btn);

      if (i === 0) btn.tabIndex = 0;
    });

    bar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      cats.forEach(function (cat) {
        const current = bar.querySelector('[data-category="' + cat + '"]');
        current.setAttribute('aria-pressed', String(current === btn));
      });
      filterProjects(btn.dataset.category);
    });
  }

  const grid = function () {
    return $('#portfolio-grid');
  };

  function filterProjects(cat) {
    const cards = $$('.portfolio-card', grid());
    cards.forEach(function (card) {
      const show = cat === 'todos' || card.dataset.category === cat;
      if (show) {
        card.style.animation = 'none';
        card.hidden = false;
        void card.offsetWidth;
        card.style.animation = '';
      } else {
        card.hidden = true;
      }
    });
  }

  /* ---------- Modal do projeto ---------- */
  let modalActive = false;
  let lastFocused = null;
  let currentModalImages = null;

  function findProject(id) {
    return D.projects.find(function (p) {
      return p.id === id;
    });
  }

  function openModal(id) {
    const project = findProject(id);
    if (!project) return;
    const modal = $('#project-modal');
    lastFocused = document.activeElement;

    currentModalImages = project.images;
    galleryIndex = 0;

    $('#modal-cat').textContent = D.categoryLabels[project.category];
    $('#modal-title').textContent = project.title;
    $('#modal-desc').textContent = project.description;

    const loc = $('#modal-location');
    if (project.location) {
      $('#modal-location-name').textContent = project.location;
      loc.hidden = false;
    } else {
      loc.hidden = true;
    }

    const waBtn = $('#modal-wa');
    if (window.LUMAS.wa) {
      waBtn.href = window.LUMAS.wa.buildUrl('Gostaria de um orçamento para: ' + project.title + '.');
      waBtn.target = '_blank';
      waBtn.rel = 'noopener';
    }

    renderGallery();
    modal.setAttribute('data-open', 'true');
    modalActive = true;
    document.body.classList.add('no-scroll');
    $('#modal-close').focus();
  }

  function closeModal() {
    if (!modalActive) return;
    const modal = $('#project-modal');
    modal.removeAttribute('data-open');
    modalActive = false;
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  }

  function renderGallery() {
    const imgs = currentModalImages || [];
    $('#modal-img').src = imgs[0];
    $('#modal-img').alt = $('#modal-title').textContent;
    $('#modal-img').onload = function () {
      $('#modal-img').removeAttribute('hidden');
    };

    const thumbs = $('#modal-thumbs');
    thumbs.innerHTML = '';
    imgs.forEach(function (src, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal__thumb';
      btn.setAttribute('aria-label', 'Ver foto ' + (i + 1) + ' de ' + imgs.length);
      if (i === 0) btn.setAttribute('aria-current', 'true');
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.loading = 'lazy';
      img.width = 72;
      img.height = 54;
      btn.appendChild(img);
      btn.addEventListener('click', function () {
        showGalleryImage(i);
      });
      thumbs.appendChild(btn);
    });
  }

  let galleryIndex = 0;

  function showGalleryImage(i) {
    if (!currentModalImages || !currentModalImages.length) return;
    galleryIndex = (i + currentModalImages.length) % currentModalImages.length;
    const img = $('#modal-img');
    img.hidden = true;
    img.src = currentModalImages[galleryIndex];
    img.alt = $('#modal-title').textContent;
    $$('#modal-thumbs .modal__thumb').forEach(function (thumb, t) {
      thumb.setAttribute('aria-current', t === galleryIndex ? 'true' : 'false');
    });
  }

  function initModal() {
    const modal = $('#project-modal');

    $('#modal-close').addEventListener('click', closeModal);
    $('#modal-prev').addEventListener('click', function () {
      showGalleryImage(galleryIndex - 1);
    });
    $('#modal-next').addEventListener('click', function () {
      showGalleryImage(galleryIndex + 1);
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.classList.contains('modal__backdrop')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!modalActive) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showGalleryImage(galleryIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showGalleryImage(galleryIndex + 1);
      } else if (e.key === 'Tab') {
        trapFocus(modal, e);
      }
    });
  }

  function trapFocus(container, event) {
    const focusables = $$("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])", container).filter(
      function (el) {
        return el.offsetParent !== null && !el.hidden;
      }
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* ---------- Antes / Depois ---------- */
  function initBeforeAfter() {
    const box = $('#before-after');
    if (!box) return;

    const DBA = D.beforeAfter;
    $('.ba__img--before', box).src = DBA.before.src;
    $('.ba__img--before', box).alt = DBA.before.alt;
    $('.ba__img--after', box).src = DBA.after.src;
    $('.ba__img--after', box).alt = DBA.after.alt;

    const range = $('.ba__range', box);
    box.style.setProperty('--ba-pos', range.value + '%');
    range.addEventListener('input', function () {
      box.style.setProperty('--ba-pos', range.value + '%');
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    const btn = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!btn || !menu) return;
    menu.inert = true;

    const isOpen = function () {
      return btn.getAttribute('aria-expanded') === 'true';
    };
    const setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      menu.setAttribute('data-open', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      menu.inert = !open;
      // Ao abrir, Tab leva do botão ao primeiro link, sem saltos de foco.
      if (!open) {
        btn.focus();
      }
    };

    btn.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === 'Tab') {
        const focusables = [btn].concat($$("a[href], button:not([disabled])", menu));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024 && isOpen()) setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  /* ---------- Scrollspy ---------- */
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;
    const sections = $$('main section[id]');
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setAriaCurrent('.nav__link', id);
            setAriaCurrent('.mobile-menu__link', id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------- Revelação suave ---------- */
  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach(function (el) {
      el.classList.add('reveal--pending');
      io.observe(el);
    });
  }

  /* ---------- Instagram ---------- */
  function renderInstagram() {
    const grid = $('#instagram-grid');
    if (!grid) return;
    grid.innerHTML = D.instagramItems
      .map(function (item) {
        return (
          '<a class="instagram__item" href="' + D.site.instagramUrl + '" target="_blank" rel="noopener" aria-label="Abrir Instagram: ' + item.alt + '">' +
          '<img src="' + item.src + '" alt="' + item.alt + '" loading="lazy" width="600" height="600">' +
          '<span class="instagram__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>' +
          '</span>' +
          '</a>'
        );
      })
      .join('');
  }

  /* ---------- Mapa ---------- */
  function initMap() {
    const frame = $('#map-frame');
    if (frame && D.site.mapEmbedSrc) {
      frame.src = D.site.mapEmbedSrc;
    }
  }

  /* ---------- Formulário ---------- */
  function initForm() {
    const form = $('#quote-form');
    if (!form) return;

    // popula select de serviços
    const sel = $('#form-servico');
    if (sel) {
      sel.innerHTML =
        '<option value="">Selecione um serviço</option>' +
        D.formServices
          .map(function (s) {
            return '<option value="' + s + '">' + s + '</option>';
          })
          .join('');
    }

    const validators = {
      nome: function (v) {
        return v.trim().length >= 2 ? '' : 'Informe seu nome.';
      },
      whatsapp: function (v) {
        const digits = v.replace(/\D/g, '');
        const ok = digits.length >= 10 && digits.length <= 11 && !/^0/.test(digits);
        return ok ? '' : 'Informe um WhatsApp válido com DDD.';
      },
      cidade: function (v) {
        return v.trim().length >= 2 ? '' : 'Informe sua cidade.';
      },
      servico: function (v) {
        return v ? '' : 'Selecione um serviço.';
      }
    };

    const setStatus = function (html, kind) {
      const status = $('#form-status');
      status.dataset.kind = kind;
      status.innerHTML = html;
      status.classList.add('is-visible');
    };
    const hideStatus = function () {
      $('#form-status').classList.remove('is-visible');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideStatus();

      let firstInvalid = null;
      ['nome', 'whatsapp', 'cidade', 'servico'].forEach(function (name) {
        const field = form.querySelector('[name="' + name + '"]');
        const msg = validators[name](field.value);
        const wrap = field.closest('.field');
        if (msg) {
          wrap.classList.add('is-invalid');
          const errEl = wrap.querySelector('.field__error');
          if (errEl) errEl.textContent = msg;
          if (!firstInvalid) firstInvalid = field;
        } else {
          wrap.classList.remove('is-invalid');
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        setStatus('Revise os campos destacados e tente novamente.', 'error');
        return;
      }

      const submit = $('#form-submit');
      submit.disabled = true;
      submit.classList.add('btn--loading');
      submit.innerHTML =
        '<span class="spinner" aria-hidden="true"></span> Abrindo WhatsApp…';

      const data = {
        nome: $('#form-nome').value.trim(),
        whatsapp: $('#form-whatsapp').value.trim(),
        cidade: $('#form-cidade').value.trim(),
        servico: sel.value,
        mensagem: $('#form-mensagem').value.trim()
      };

      const msg =
        '*Solicitação de orçamento — site*\n\n' +
        'Nome: ' + data.nome + '\n' +
        'WhatsApp: ' + data.whatsapp + '\n' +
        'Cidade: ' + data.cidade + '\n' +
        'Serviço desejado: ' + data.servico +
        (data.mensagem ? '\nMensagem: ' + data.mensagem : '');

      setTimeout(function () {
        const url = window.LUMAS.wa.buildUrl(msg);
        const win = window.open(url, '_blank', 'noopener');

        submit.disabled = false;
        submit.classList.remove('btn--loading');
        submit.innerHTML = 'Enviar pelo WhatsApp';

        if (win) {
          setStatus(
            'Tudo certo! Abrimos o WhatsApp para finalizar seu orçamento.',
            'success'
          );
        } else {
          setStatus(
            'Se o WhatsApp não abriu, <a href="' + url + '" target="_blank" rel="noopener">clique aqui</a> para falar com a Lumas.',
            'error'
          );
        }
      }, 700);
    });

    // limpa estado de erro ao digitar
    form.addEventListener('input', function (e) {
      const field = e.target.closest('.field');
      if (field) field.classList.remove('is-invalid');
    });
  }

  /* ---------- Ano no footer ---------- */
  function setYear() {
    const el = $('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderServices();
    // Inclui os botões criados após a primeira configuração dos links.
    if (D.wa) D.wa.linkify();
    renderPortfolio();
    initFilters();
    initModal();
    initBeforeAfter();
    initMenu();
    initScrollSpy();
    initReveal();
    renderInstagram();
    initMap();
    initForm();
    setYear();
  });
})();
