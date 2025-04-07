# Documentação de Entrega

## Visão Geral

Esta documentação descreve a entrega do projeto ***Dev Geo***. O objetivo principal deste projeto é ler arquivo CSV, enviar dadoas ao fronte e calcular medias, somas emedianas com base nos porntos dentro de um poligono. O projeto foi desenvolvido utilizando ***NexJs*** para front e ***express + typeScript*** no back.

## Sumário

1. [Visão Geral](#visão-geral)
2. [Objetivos da Entrega](#objetivos-da-entrega)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Funcionalidades Implementadas](#funcionalidades-implementadas)
5. [Instruções de Instalação](#instruções-de-instalação)
6. [Configuração](#configuração)
7. [Testes Realizados](#testes-realizados)
8. [Considerações Finais](#considerações-finais)

## Objetivos da Entrega

- Implementação da funcionalidade ler o arquvo csv, exibir pontos no mapa, criar pontos no mapa.
- Garantir a qualidade e estabilidade do sistema com ultilizado o wewebSocket para envio de dados em lots.
- Implementação de botão para vidualisar o arquivo.

## Tecnologias Utilizadas

- **Frontend**: NextJs, Zustand, e zod
- **Backend**: Express + typescript
- **Banco de Dados**:Mysql
- **Ferramentas de Desenvolvimento**:Docker
- **Bibliotecas**:  Material-UI

## Funcionalidades Implementadas

1. **Select de arquivos**:
   - Descrição: Ao selecionar um arquivo no select que esta na barra superio ele será carregado..
   - Como usar: Aguarde uns segundos e procure o ponto de localização  no mapa.
   - Exemplos:Clicar uma fez select.

2. **Poligono**:
   - Descrição: Poligono.
   - Como usar: clicar no icone da lateral depois clicar na  area ao qual quer calcular aos quais quer obter calculo, em fe dar doublclic para confirmar a area e calcular.

2. **Point Map**:
   - Descrição: point Map.
   - Como usar: clicar no botão adicionar icone e depois clicar no mapa surgirar um modal com as informações da localização você pode salvar ou não, uma vez salvos são persistidos no baco de dados;


## Instruções de Instalação

Para configurar e executar o projeto utilizando Docker, siga as etapas abaixo:

### 1. Clonando o Repositório

Clone o repositório do projeto para sua máquina local:

## Construindo e Subindo os Contêineres
No diretório raiz do projeto, onde o arquivo docker-compose.yml está localizado, execute o seguinte comando para construir e iniciar os contêineres:

Esse comando vai:

Construir os contêineres necessários (backend, frontend, e db).

Subir os contêineres com base no arquivo docker-compose.yml.

## Acessando os Contêineres
Após os contêineres estarem em funcionamento, você pode acessar:

Frontend: Acesse o frontend no navegador em http://localhost:3000.

Backend: O backend estará disponível em http://localhost:8000 para API RESTful.

Banco de Dados (MySQL): O banco de dados MySQL estará disponível na porta 3306 com as credenciais de usuário configuradas no docker-compose.yml:

Usuário: dev

Senha: dev

### Banco de dados: dev_geo

## Configuração Adicional do Banco de Dados

O contêiner do MySQL já está configurado para criar o banco de dados dev_geo automaticamente. Caso precise de algum dado específico ou realizar migrações, acesse o contêiner do backend:

docker exec -it server bash