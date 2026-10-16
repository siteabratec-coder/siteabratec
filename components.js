/**
 * ABRATEC — components.js
 * Monta e insere o cabeçalho, o rodapé e os botões flutuantes nas páginas.
 * Depende de config.js, que precisa ser carregado antes deste arquivo.
 * Como o script fica no final do <body>, os elementos que ele procura já existem.
 */
(function () {
  // Mantém variáveis e funções deste arquivo privadas, sem poluir o escopo global.
  'use strict';

  /* ── Acesso às configurações ─────────────────────────── */
  // Usa as configurações do config.js; null permite detectar quando ele não foi carregado.
  const cfg = (typeof ABRATEC_CONFIG !== 'undefined') ? ABRATEC_CONFIG : null;

  // Retorna o endereço configurado do WhatsApp.
  function waUrl() {
    // '#' evita erro caso config.js ou o endereço de WhatsApp ainda não estejam configurados.
    if (!cfg) return '#';

    // Se houver um link curto (por exemplo, w.app), ele tem prioridade sobre o número.
    const link = cfg.contato.whatsappLink;
    if (link) return link;

    // Alternativa: monta um link wa.me usando o número internacional e a mensagem configurados.
    const num = cfg.contato.whatsapp;
    const msg = cfg.contato.whatsappMensagem || '';
    if (!num || num === 'NUMERO_WHATSAPP_A_CONFIGURAR') return '#';
    return `https://wa.me/${num}?text=${msg}`;
  }

  /* ── Links de navegação ───────────────────────────────── */
  // Cada id corresponde ao valor de data-page definido no <body> de cada página.
  const NAV = [
    { id: 'home',       label: 'Início',           href: 'index.html' },
    { id: 'quem-somos', label: 'Quem Somos',        href: 'quem-somos.html' },
    { id: 'servicos',   label: 'Áreas de Atuação',  href: 'servicos.html' },
  ];

  /* ── Criação do cabeçalho ─────────────────────────────── */
  function buildHeader() {
    // Identifica a página atual para destacar o link correspondente no menu.
    const currentPage = document.body.dataset.page || 'home';
    // Reutiliza o mesmo endereço de WhatsApp no botão de atendimento do cabeçalho.
    const url = waUrl();

    // Converte cada item do NAV em um link HTML.
    // A classe "active" é adicionada somente ao link da página atual.
    const links = NAV.map(item =>
      `<a href="${item.href}" class="nav-link${currentPage === item.id ? ' active' : ''}">${item.label}</a>`
    ).join('');

    // Devolve o HTML completo do cabeçalho para ser inserido na página.
    return `
<header id="mainHeader">
  <div class="header-inner">
    <!-- Logo clicável que leva de volta à página inicial. -->
    <a href="index.html" class="logo-link" aria-label="ABRATEC — página inicial">
      <img src="assets/logob.png" alt="Logo ABRATEC Serviços" class="logo-img">
    </a>
    <!-- Menu principal e botão para solicitar atendimento pelo WhatsApp. -->
    <nav class="nav-links" id="navLinks" aria-label="Navegação principal">
      ${links}
      <a href="${url}" class="btn-nav-cta" target="_blank" rel="noopener noreferrer">Solicitar Atendimento</a>
    </nav>
    <!-- Botão de menu usado em telas menores; script.js controla abrir e fechar. -->
    <button class="hamburger" id="hamburgerBtn" aria-label="Abrir menu" aria-expanded="false" aria-controls="navLinks">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
  }

  /* ── Criação do rodapé ────────────────────────────────── */
  function buildFooter() {
    // Lê as informações de contato; usa objeto vazio se não houver configuração.
    const c = cfg ? cfg.contato : {};
    // Lê os dados da empresa; fornece uma frase padrão quando a configuração não existe.
    const e = cfg ? cfg.empresa : { slogan: 'Comprometimento, Responsabilidade e Ação.' };
    // Link usado no rodapé para abrir o atendimento no WhatsApp.
    const url = waUrl();
    // Usa a lista de serviços configurada; se não existir, o rodapé fica sem links de serviço.
    const servicos = cfg ? cfg.servicos || [] : [];

    // Cria uma linha de informação apenas quando o valor foi preenchido.
    // Valores ainda marcados como "_CONFIGURAR" são considerados placeholders e ocultados.
    const infoRow = (val, label) => (val && !val.includes('_CONFIGURAR'))
      ? `<p class="footer-info">${label ? label + ' ' : ''}${val}</p>`
      : '';

    // Mostra no máximo cinco serviços, cada um levando à página de serviços.
    const svcLinks = servicos.slice(0, 5).map(s =>
      `<li><a href="servicos.html">${s.nome}</a></li>`
    ).join('');

    // Devolve o HTML completo do rodapé, preenchido com dados da configuração.
    return `
<footer id="footer">
  <div class="footer-top">
    <div class="footer-brand">
      <!-- Identidade da empresa, slogan e informações de contato configuradas. -->
      <img src="assets/logob.png" alt="Logo ABRATEC" class="footer-logo">
      <p class="footer-slogan">${e.slogan || 'Comprometimento, Responsabilidade e Ação.'}</p>
      ${infoRow(c.endereco)}
      ${infoRow(c.telefone)}
      ${infoRow(c.email)}
      <!-- O CNPJ só aparece quando foi informado em config.js. -->
      ${c.cnpj ? `<p class="footer-info">CNPJ: ${c.cnpj}</p>` : ''}
    </div>
    <!-- Atalhos para as páginas principais do site. -->
    <div class="footer-col">
      <h4>Navegação</h4>
      <ul>
        <li><a href="index.html">Início</a></li>
        <li><a href="quem-somos.html">Quem Somos</a></li>
        <li><a href="servicos.html">Áreas de Atuação</a></li>
      </ul>
    </div>
    <!-- Links para os primeiros serviços cadastrados em config.js. -->
    <div class="footer-col">
      <h4>Serviços</h4>
      <ul>${svcLinks}</ul>
    </div>
    <!-- Canais de atendimento e horário, quando informado. -->
    <div class="footer-col">
      <h4>Atendimento</h4>
      <ul>
        <li><a href="${url}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
      </ul>
      ${c.horario ? `<p class="footer-info footer-info-sm">Horário de atendimento: ${c.horario}</p>` : ''}
    </div>
  </div>
  <!-- Faixa inferior com direitos autorais e slogan. -->
  <div class="footer-bottom">
    <p>ABRATEC - Comprometimento, Responsabilidade e Ação.</p>
    <p>© 2026 Conceição Ramos</p>
  </div>
</footer>`;
  }

  /* ── Criação dos botões flutuantes ────────────────────── */
  function buildFloat() {
    // O botão flutuante também usa o endereço configurado do WhatsApp.
    const url = waUrl();
    // Ícone vetorial embutido do WhatsApp; não precisa carregar imagem externa.
    const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;
    // Ícone vetorial da seta usada pelo botão "voltar ao topo".
    const UP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>`;

    // Devolve o link do WhatsApp e o botão de voltar ao topo.
    // script.js controla a ação e a visibilidade do botão de voltar ao topo.
    return `
<a href="${url}" id="whatsapp-float" class="whatsapp-float" target="_blank" rel="noopener noreferrer"
   aria-label="Falar com a ABRATEC pelo WhatsApp" title="Falar pelo WhatsApp">
  ${WA_SVG}
  <span class="whatsapp-tooltip">Fale conosco!</span>
</a>
<button class="scroll-top" id="scrollTopBtn" aria-label="Voltar ao topo" hidden>
  ${UP_SVG}
</button>`;
  }

  /* ── Inserção dos componentes na página ───────────────── */
  // Localiza os elementos vazios definidos no HTML como pontos de inserção.
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  const floatEl  = document.getElementById('site-float');

  // Insere cada componente apenas se o respectivo ponto de inserção existir.
  // Assim, páginas que não tenham um desses elementos não geram erro.
  if (headerEl) headerEl.innerHTML = buildHeader();
  if (footerEl) footerEl.innerHTML = buildFooter();
  if (floatEl)  floatEl.innerHTML  = buildFloat();

})();
