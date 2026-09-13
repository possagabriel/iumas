/* ============================================================
   Iumas Energia Solar — whatsapp.js
   Utilitários para links do WhatsApp (números e mensagem).
   ============================================================ */

(function () {
  'use strict';

  const SITE = window.LUMAS.site;

  function buildMessage(extra) {
    let msg = SITE.whatsappMessage;
    if (extra) {
      msg = msg + '\n\n' + extra;
    }
    return msg;
  }

  function buildUrl(extra) {
    return (
      'https://wa.me/' +
      SITE.phoneIntl +
      '?text=' +
      encodeURIComponent(buildMessage(extra))
    );
  }

  function linkify() {
    const links = document.querySelectorAll('[data-wa-link]');
    links.forEach(function (el) {
      const extra = el.getAttribute('data-wa-extra') || null;
      el.href = buildUrl(extra);
      el.target = '_blank';
      el.rel = 'noopener';
    });
  }

  document.addEventListener('DOMContentLoaded', linkify);

  window.LUMAS.wa = {
    linkify,
    buildUrl,
    buildMessage
  };
})();
