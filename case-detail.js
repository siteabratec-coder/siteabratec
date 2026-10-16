(function () {
  'use strict';

  const slug = document.body.dataset.caseSlug;
  const data = window.ABRATEC_CASES && window.ABRATEC_CASES[slug];
  const root = document.getElementById('caseDetail');
  if (!data || !root) throw new Error(`Não foi possível carregar o case "${slug}".`);

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function appendParagraphs(parent, paragraphs) {
    (paragraphs || []).forEach(text => parent.appendChild(element('p', '', text)));
  }

  const banner = element('div', 'page-banner');
  const bannerContainer = element('div', 'container');
  const breadcrumb = element('nav', 'breadcrumb');
  breadcrumb.setAttribute('aria-label', 'Breadcrumb');
  const homeLink = element('a', '', 'Início');
  homeLink.href = 'index.html';
  const separator = element('span', '', '›');
  separator.setAttribute('aria-hidden', 'true');
  const casesLink = element('a', '', 'Cases de Sucesso');
  casesLink.href = 'cases.html';
  const currentPage = element('span', '', data.region);
  currentPage.setAttribute('aria-current', 'page');
  breadcrumb.append(homeLink, separator, casesLink, element('span', '', '›'), currentPage);
  const title = element('h1', '', data.region);
  bannerContainer.append(breadcrumb, title);
  banner.appendChild(bannerContainer);
  root.appendChild(banner);

  const hero = element('section', 'case-detail-hero container');
  const heroImage = element('img', 'case-detail-hero-image');
  heroImage.src = data.heroImage;
  heroImage.alt = data.heroAlt;
  heroImage.fetchPriority = 'high';
  const heroCopy = element('div', 'case-detail-hero-copy');
  heroCopy.append(
    element('span', 'section-label', 'Case de sucesso'),
    element('h2', '', data.service),
    element('p', '', data.introduction)
  );
  hero.append(heroImage, heroCopy);
  root.appendChild(hero);

  const facts = element('dl', 'case-facts');
  data.facts.forEach(([label, value]) => {
    const group = element('div', 'case-fact');
    group.append(element('dt', '', label), element('dd', '', value));
    facts.appendChild(group);
  });
  const factsSection = element('section', 'container case-facts-section');
  factsSection.setAttribute('aria-label', 'Dados técnicos do projeto');
  factsSection.appendChild(facts);
  root.appendChild(factsSection);

  if (data.metrics) {
    const metricsSection = element('section', 'case-metrics container');
    metricsSection.setAttribute('aria-label', 'Indicadores documentados');
    data.metrics.forEach(([value, label, detail]) => {
      const metric = element('article', 'case-metric');
      metric.append(
        element('strong', '', value),
        element('span', '', label),
        element('small', '', detail)
      );
      metricsSection.appendChild(metric);
    });
    root.appendChild(metricsSection);
  }

  const sections = element('div', 'case-detail-sections container');
  data.sections.forEach(sectionData => {
    const section = element('section', 'case-detail-section');
    section.appendChild(element('h2', '', sectionData.title));
    appendParagraphs(section, sectionData.paragraphs);
    if (sectionData.bullets && sectionData.bullets.length) {
      const list = element('ul', 'case-detail-list');
      sectionData.bullets.forEach(item => list.appendChild(element('li', '', item)));
      section.appendChild(list);
    }
    appendParagraphs(section, sectionData.after);
    sections.appendChild(section);
  });
  root.appendChild(sections);

  const gallerySection = element('section', 'case-gallery-section');
  const galleryContainer = element('div', 'container');
  galleryContainer.appendChild(element('h2', '', 'Registros do serviço'));
  const gallery = element('div', 'case-gallery');
  data.gallery.forEach(photo => {
    const figure = element('figure', 'case-gallery-item');
    const image = element('img');
    image.src = `assets/cases/media/${photo[0]}`;
    image.alt = photo[1];
    image.loading = 'lazy';
    figure.append(
      image,
      element('span', 'case-gallery-phase', photo[2]),
      element('figcaption', '', photo[1])
    );
    gallery.appendChild(figure);
  });
  galleryContainer.appendChild(gallery);
  gallerySection.appendChild(galleryContainer);
  root.appendChild(gallerySection);

  const back = element('div', 'container case-detail-back');
  const backLink = element('a', 'btn-outline', '← Voltar para Cases de Sucesso');
  backLink.href = 'cases.html';
  back.appendChild(backLink);
  root.appendChild(back);

  document.title = `${data.region} | Cases de Sucesso ABRATEC`;
})();
