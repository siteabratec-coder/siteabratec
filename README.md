# Site institucional ABRATEC

Site institucional estático da ABRATEC, desenvolvido com HTML, CSS e JavaScript. Não utiliza framework, etapa de compilação ou instalação de dependências.

## Páginas e recursos

- Página inicial com apresentação da empresa e resumo dos serviços.
- Página Quem Somos com informações institucionais.
- Página Áreas de Atuação com os serviços cadastrados.
- Página Cases de Sucesso com quatro projetos apresentados sem identificação dos clientes.
- Página individual para cada case, com descrição técnica e imagens.
- Navegação, rodapé e botões de atendimento compartilhados entre as páginas.
- Layout responsivo para computadores, tablets e celulares.

## Estrutura do projeto

```text
.
├── assets/
│   ├── cases/
│   │   └── media/             Imagens anonimizadas dos cases
│   ├── Auvo.png               Logo do sistema Auvo
│   └── logob.png              Logo da ABRATEC
├── cases/
│   ├── brooklin/index.html
│   ├── osasco/index.html
│   ├── tatuape/index.html
│   └── vila-anastacio/index.html
├── cases-data.js              Conteúdo e dados dos cases
├── case-detail.js             Renderização das páginas individuais
├── cases.html                 Página principal de cases
├── components.js              Cabeçalho, rodapé e elementos compartilhados
├── config.js                  Dados da empresa, contato e serviços
├── index.html                 Página inicial
├── quem-somos.html            Página institucional
├── script.js                  Comportamentos interativos
├── servicos.html              Página de serviços
└── styles.css                 Estilos e regras responsivas
```

## Como visualizar localmente

Use um servidor HTTP local para testar as páginas e as rotas dos cases. Na pasta do projeto, execute:

```powershell
py -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

Também é possível abrir a pasta do projeto no Visual Studio Code e usar uma extensão de servidor local, como Live Server.

## Como atualizar informações

### Dados da empresa e contato

Edite `config.js` para atualizar o slogan, os dados de contato, o horário de atendimento, os serviços e as informações institucionais. Confira os valores de telefone, email e endereço antes de publicar. Os valores de exemplo que contêm `A_CONFIGURAR` são indicações para preenchimento.

### Cases de sucesso

Os títulos, descrições, informações técnicas, legendas e caminhos das imagens dos cases estão em `cases-data.js`. As páginas individuais existentes ficam em `cases/`.

Ao alterar ou adicionar conteúdo:

1. Preserve a anonimização. Não publique nomes de clientes, condomínios, empresas contratantes ou pessoas.
2. Use somente informações confirmadas nos materiais de origem.
3. Coloque as imagens publicáveis em `assets/cases/media/` e atualize os caminhos correspondentes em `cases-data.js`.
4. Para criar um case novo, adicione os dados em `cases-data.js`, crie uma página seguindo o padrão das páginas em `cases/` e adicione um card em `cases.html`.
5. Confira a página principal e a página individual em tamanhos de tela diferentes.

Os documentos originais dos cases contêm informações identificáveis e não devem ser enviados ao repositório. O arquivo `.gitignore` exclui os documentos-fonte conhecidos e alguns formatos de imagem originais da pasta de cases. Antes de publicar, confira a lista de arquivos preparados para o commit.

### Estilos e navegação

- Edite `styles.css` para alterar o visual e os ajustes responsivos.
- Edite `components.js` para atualizar o menu e os elementos compartilhados do cabeçalho ou rodapé.
- Edite os arquivos HTML correspondentes para alterar a estrutura das páginas.
- Edite `script.js` para alterar comportamentos compartilhados, como animações e navegação móvel.

## Verificações antes de publicar

O projeto não possui uma suíte de testes automatizados. Antes de publicar alterações:

1. Abra as páginas principais e os quatro endereços dos cases no navegador.
2. Teste os links do menu, os cards, os botões de retorno e os controles móveis.
3. Confira se as imagens carregam e se os textos permanecem legíveis em telas estreitas.
4. Confirme que nenhum conteúdo ou nome de arquivo identifica os clientes dos cases.
5. Verifique os scripts JavaScript com Node.js, quando disponível:

```powershell
node --check config.js
node --check components.js
node --check script.js
node --check cases-data.js
node --check case-detail.js
```

## Publicação

O site contém arquivos estáticos e pode ser hospedado em um serviço que publique HTML, CSS, JavaScript e imagens. Configure o serviço para usar a raiz do repositório como diretório publicado e confirme que os caminhos relativos e as páginas dos cases funcionam no endereço de produção.

Para enviar alterações ao GitHub:

```powershell
git status
git add README.md
git add .
git status
git commit -m "Descreva as alterações"
git push origin main
```

Revise `git status` antes do commit para garantir que documentos internos, credenciais ou arquivos com informações confidenciais não serão publicados.
