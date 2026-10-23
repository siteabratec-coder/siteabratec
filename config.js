/**
 * ============================================================
 * ABRATEC - Arquivo de Configuração Central do Site
 * ============================================================
 * Edite este arquivo para atualizar as informações do site.
 * Não é necessário alterar index.html, styles.css ou script.js
 * para modificar os dados abaixo.
 * ============================================================
 */

const ABRATEC_CONFIG = {

  /* ----------------------------------------------------------
   * EMPRESA
   * ---------------------------------------------------------- */
  empresa: {
    nome:     'ABRATEC',
    subtitulo: 'Serviços',
    slogan:   'Comprometimento, Responsabilidade e Ação.',
    logo:     'assets/logob.png',   // Caminho relativo ao index.html
  },

     /* ---------------------------------------------------------- */
   /* CONTATO
   * ⚠️  Substitua NUMERO_WHATSAPP_A_CONFIGURAR pelo número real
   *     no formato internacional sem espaços ou símbolos.
   *     Exemplo: 5511947706372  (55 = Brasil, 11 = DDD, número)
   /* ---------------------------------------------------------- */
  contato: {
    whatsappLink:    'https://wa.me/5511947706372?text=Ol%C3%A1%2C%20vim%20atrav%C3%A9s%20do%20site%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.',
    whatsapp:         'NUMERO_WHATSAPP_A_CONFIGURAR',
    whatsappMensagem: 'Ol%C3%A1%21+Conhe%C3%A7a+a+ABRATEC+pelo+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+servi%C3%A7os+de+manuten%C3%A7%C3%A3o+e+engenharia.',
    
    telefone:         '(11) 4437-2375',        // Ex: (11) 4437-2375
    email:            'EMAIL_A_CONFIGURAR',     // Ex: contato@abra.tec.br
    endereco:         'contato@abra.tec.br',          // Ex: São Paulo - SP
    horario:          '07h às 17h',
    site:             'www.abra.tec.br',
    cnpj:             '',  // Deixar vazio se não quiser exibir
  },
  /* ---------------------------------------------------------- */
  servicos: [
    {
      id:        'geradores',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`,
      nome:      'Grupos Geradores',
      descricao: 'Manutenção preventiva e corretiva de grupos geradores, com foco na confiabilidade dos equipamentos e na continuidade operacional das instalações atendidas.',
    },
    {
      id:        'bombas',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><circle cx="18" cy="6" r="3"/><path d="M20.5 3.5 22 2"/></svg>`,
      nome:      'Bombas em Geral',
      descricao: 'Manutenção preventiva e corretiva de bombas e sistemas de bombeamento, conforme as características da instalação e dos equipamentos atendidos.',
    },
    {
      id:        'alarme-incendio',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><line x1="12" y1="2" x2="12" y2="4"/></svg>`,
      nome:      'Alarme de Incêndio',
      descricao: 'Manutenção preventiva e corretiva de sistemas de alarme de incêndio, visando à confiabilidade dos equipamentos e ao funcionamento adequado do sistema.',
    },
    {
      id:        'pressurizacao',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>`,
      nome:      'Pressurização de Escadas',
      descricao: 'Manutenção preventiva e corretiva de sistemas de pressurização de escadas, importantes para as estratégias de segurança e proteção contra incêndio das edificações.',
    },
    {
      id:        'exaustao',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 1 0 20"/><path d="M12 8v4l2 2"/><path d="M4.93 4.93 8 8"/><path d="M4.93 19.07 8 16"/></svg>`,
      nome:      'Exaustão',
      descricao: 'Manutenção preventiva e corretiva de sistemas de exaustão, com foco no funcionamento adequado dos equipamentos e na conservação das instalações.',
    },
    {
      id:        'portas-corta-fogo',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><circle cx="7" cy="12" r="1" fill="currentColor"/></svg>`,
      nome:      'Portas Corta-Fogo',
      descricao: 'Manutenção preventiva e corretiva de portas corta-fogo, visando à conservação e ao funcionamento adequado dos componentes instalados.',
    },
    {
      id:        'sprinklers-hidrantes',
      icone:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      nome:      'Sprinkler e Hidrantes',
      descricao: 'Manutenção preventiva e corretiva de sistemas de sprinklers e hidrantes, com atenção às condições operacionais dos componentes e das instalações atendidas.',
    },
  ],

  /* ----------------------------------------------------------
   * EQUIPE
   * ⚠️  Esta seção usa PLACEHOLDERS.
   *     Substitua pelos dados reais dos integrantes.
   *     Para remover um integrante, apague o objeto inteiro.
   *     Para adicionar, copie um objeto e edite os campos.
   * ---------------------------------------------------------- */
  equipe: [
    {
      foto:      '',   // Caminho relativo à imagem: Ex: 'assets/foto-nome.jpg'
      nome:      'NOME DO INTEGRANTE',
      cargo:     'CARGO OU FUNÇÃO',
      bio:       'Breve descrição profissional a ser preenchida posteriormente.',
      area:      '',
    },
    {
      foto:      '',
      nome:      'NOME DO INTEGRANTE',
      cargo:     'CARGO OU FUNÇÃO',
      bio:       'Breve descrição profissional a ser preenchida posteriormente.',
      area:      '',
    },
    {
      foto:      '',
      nome:      'NOME DO INTEGRANTE',
      cargo:     'CARGO OU FUNÇÃO',
      bio:       'Breve descrição profissional a ser preenchida posteriormente.',
      area:      '',
    },
  ],

};

// Exporta para uso no script.js
if (typeof module !== 'undefined') module.exports = ABRATEC_CONFIG;
