/**
 * ABRATEC — script.js
 * Comportamentos interativos compartilhados entre todas as páginas.
 * Executado após components.js (header/footer já injetados).
 */
(function () {
  'use strict';

  const cfg = (typeof ABRATEC_CONFIG !== 'undefined') ? ABRATEC_CONFIG : null;

  function waUrl() {
    if (!cfg) return '#';
    const link = cfg.contato.whatsappLink;
    if (link) return link;
    const num = cfg.contato.whatsapp;
    const msg = cfg.contato.whatsappMensagem || '';
    if (!num || num === 'NUMERO_WHATSAPP_A_CONFIGURAR') return '#';
    return `https://wa.me/${num}?text=${msg}`;
  }

  /* ── Header sticky ───────────────────────────────── */
  function initHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    const isInner = document.body.classList.contains('page-inner');
    if (!isInner) {
      const toggle = () => header.classList.toggle('scrolled', window.scrollY > 40);
      toggle();
      window.addEventListener('scroll', toggle, { passive: true });
    }
  }

  /* ── Mobile hamburger ────────────────────────────── */
  function initMobileMenu() {
    const btn = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('navLinks');
    if (!btn || !nav) return;

    function close() {
      btn.classList.remove('open');
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open.toString());
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !nav.contains(e.target)) close();
    });
  }

  /* ── Scroll-reveal ────────────────────────────────── */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(el => {
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add('visible');
      } else {
        obs.observe(el);
      }
    });
  }

  /* ── Scroll to top ────────────────────────────────── */
  function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => { btn.hidden = window.scrollY < 400; }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── WhatsApp buttons on page ─────────────────────── */
  function initWaLinks() {
    const url = waUrl();
    document.querySelectorAll('[data-wa-link]').forEach(el => { el.href = url; });
  }

  /* ── Inject services grid (servicos.html) ─────────── */
  function initServicosGrid() {
    const grid = document.getElementById('servicosGrid');
    if (!grid || !cfg || !cfg.servicos) return;
    const url = waUrl();
    const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;

    grid.innerHTML = cfg.servicos.map((s, i) => `
      <div class="servico-card reveal${i > 0 ? ' reveal-d' + Math.min(i % 4, 4) : ''}" role="listitem">
        <div class="servico-icon" aria-hidden="true">${s.icone}</div>
        <h3>${s.nome}</h3>
        <p>${s.descricao}</p>
        <a href="${url}" class="btn-wa-servico" target="_blank" rel="noopener noreferrer"
           aria-label="Solicitar atendimento para ${s.nome}">
          ${WA_SVG} Solicitar Atendimento
        </a>
      </div>
    `).join('');
  }

  /* ── Inject mini services (index.html) ───────────── */
  function initServicosResumo() {
    const grid = document.getElementById('servicosResumoGrid');
    if (!grid || !cfg || !cfg.servicos) return;
    grid.innerHTML = cfg.servicos.map((s, i) => `
      <div class="servico-mini reveal${i > 0 ? ' reveal-d' + Math.min(i % 4, 4) : ''}">
        <div class="servico-mini-icon" aria-hidden="true">${s.icone}</div>
        <h4>${s.nome}</h4>
      </div>
    `).join('');
  }

  /* ── Inject equipe (equipe.html) ─────────────────── */
  function initEquipe() {
    const grid = document.getElementById('equipeGrid');
    if (!grid || !cfg || !cfg.equipe) return;

    const PH_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

    grid.innerHTML = cfg.equipe.map((m, i) => {
      const isPlaceholder = !m.nome || m.nome.includes('NOME DO');
      const hasPhoto = m.foto && m.foto.trim();
      return `
        <div class="equipe-card reveal${i > 0 ? ' reveal-d' + Math.min(i, 4) : ''}" role="listitem">
          <div class="equipe-foto">
            ${hasPhoto
              ? `<img src="${m.foto}" alt="Foto de ${m.nome}" loading="lazy">`
              : `<div class="foto-ph" aria-label="Foto a configurar">${PH_SVG}</div>`}
          </div>
          <div class="equipe-info">
            <h3>${isPlaceholder ? 'A preencher' : m.nome}</h3>
            <p class="equipe-cargo">${isPlaceholder ? 'Cargo a configurar' : m.cargo}</p>
            <p class="equipe-bio">${isPlaceholder ? 'Dados deste integrante devem ser configurados no arquivo config.js antes da publicação.' : m.bio}</p>
          </div>
        </div>`;
    }).join('');
  }

  /* ── Inject contact info ──────────────────────────── */
  function initContactInfo() {
    if (!cfg) return;
    const c = cfg.contato;
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = (val && !val.includes('_CONFIGURAR')) ? val : 'A configurar — edite config.js';
    };
    set('info-telefone', c.telefone);
    set('info-email',    c.email);
    set('info-endereco', c.endereco);
    set('info-horario',  c.horario);
  }

  /* ── Contact form ─────────────────────────────────── */
  function initForm() {
    const form    = document.getElementById('formContato');
    const success = document.getElementById('formSucesso');
    if (!form) return;

    function validate(input) {
      const fg = input.closest('.form-group[id]');
      if (!fg || !input.hasAttribute('required')) return true;
      let ok = true;
      if (input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      else if (input.type === 'tel') ok = input.value.trim().length >= 8;
      else ok = input.value.trim().length > 0;
      fg.classList.toggle('error', !ok);
      return ok;
    }

    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('blur', () => validate(el));
      el.addEventListener('input', () => {
        if (el.closest('.form-group')?.classList.contains('error')) validate(el);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('input[required], textarea[required]').forEach(f => {
        if (!validate(f)) valid = false;
      });
      if (!valid) return;
      form.hidden = true;
      if (success) success.hidden = false;
      const waBtn = document.getElementById('sucesso-wa');
      if (waBtn) waBtn.href = waUrl();
    });
  }

  /* ── Footer services list ─────────────────────────── */
  function initFooterServices() {
    const list = document.getElementById('footer-servicos-list');
    if (!list || !cfg || !cfg.servicos) return;
    list.innerHTML = cfg.servicos.slice(0, 5)
      .map(s => `<li><a href="servicos.html">${s.nome}</a></li>`)
      .join('');
  }

  /* ── Init ─────────────────────────────────────────── */
  initHeader();
  initMobileMenu();
  initScrollTop();
  initWaLinks();
  initServicosGrid();
  initServicosResumo();
  initEquipe();
  initScrollReveal();
  initContactInfo();
  initForm();
  initFooterServices();

})();
