# Aplicação de Agenda de Contatos - Frontend

## Descrição

Esta aplicação foi desenvolvida para o gerenciamento de contatos utilizando **Angular 17** no frontend.  
A aplicação oferece uma interface amigável para a administração de contatos, com funcionalidades para adicionar, visualizar, editar e remover contatos.  
A segurança é garantida através da implementação de **JSON Web Tokens (JWT)**. 

## Badges
</br>
<p align="center">
  <img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=FINALIZADO&color=GREEN&style=for-the-badge"/>
</p>

<h3>Front-end: </h3>
<p align="center">
  <img loading="lazy" src="https://img.shields.io/badge/Angular-17-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Angular_JWT-5.2.0-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Angular_CLI-17.3.10-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Bootstrap-5.3.5-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Font_Awesome-6.7.2-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Ngx_Toastr-19.0.0-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/Angular_Material-17.3.10-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/CSS-3-green"/>
  <img loading="lazy" src="https://img.shields.io/badge/HTML-5-green"/>
</p>

## Índice

1. [Funcionalidades](#funcionalidades)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Fluxo de Trabalho](#fluxo-de-trabalho)
4. [Conclusão](#conclusão)

## Funcionalidades

- **Autenticação e Autorização**: Acesso ao sistema através de login, utilizando autenticação baseada em **JWT**.
- **Cadastro de Contatos**: Adicione novos contatos com nome, telefone e e-mail.
- **Visualização de Contatos**: Exiba uma lista de contatos com detalhes sobre nome, telefone e e-mail.
- **Edição de Contatos**: Atualize informações de contatos existentes.
- **Exclusão de Contatos**: Remova contatos que não são mais necessários.

## Tecnologias Utilizadas

- **Frontend**: [Angular 17](https://angular.io/) - Framework para construção da interface de usuário com design moderno e responsivo.
- **Autenticação**: [JSON Web Tokens (JWT)](https://jwt.io/) - Para criação e verificação de tokens de autenticação.
- **Bibliotecas Extras**:
  - [@auth0/angular-jwt (5.2.0)](https://www.npmjs.com/package/@auth0/angular-jwt) - Integração com tokens JWT.
  - [Bootstrap (5.3.5)](https://getbootstrap.com/) - Design responsivo e componentes visuais.
  - [FontAwesome (6.7.2)](https://fontawesome.com/) - Ícones modernos para a aplicação.
  - [Ngx-Toastr (19.0.0)](https://www.npmjs.com/package/ngx-toastr) - Notificações toast amigáveis ao usuário.
  - [Angular Material (17.3.10)](https://material.angular.io/) - Componentes baseados em Material Design.

## Fluxo de Trabalho

1. **Login**: Acesse a página de login e insira suas credenciais. Após autenticação bem-sucedida, um token JWT é armazenado para gerenciar a sessão do usuário.

2. **Gerenciamento de Contatos**:
   - **Cadastro de Contatos**: Formulário para adicionar novos contatos com validação de campos obrigatórios.
   - **Visualização de Contatos**: Tabela responsiva listando todos os contatos armazenados.
   - **Edição de Contatos**: Atualização dos dados de contatos diretamente pela interface.
   - **Exclusão de Contatos**: Remoção de contatos indesejados, com confirmação e feedback via toast.

3. **Operações com Feedback Visual**:
   - Mensagens de sucesso e erro são exibidas utilizando **Ngx-Toastr** para melhorar a experiência do usuário.
   - Ícones do **FontAwesome** e componentes do **Angular Material** são utilizados para enriquecer a interface.

## Conclusão

A aplicação **Agenda Telefônica** proporciona uma experiência fluida e segura para o gerenciamento de contatos pessoais ou profissionais.  
Com o poder do **Angular 17**, bibliotecas modernas como **Angular Material** e **Ngx-Toastr**, além da segurança do **JWT**, a solução se destaca pela usabilidade e eficiência.  
É ideal para qualquer ambiente que necessite de uma gestão prática de contatos.
