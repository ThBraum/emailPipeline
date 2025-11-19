# Compose UI · Email Delivery Frontend

Interface em React + Vite focada em UX para compor e enviar emails com feedback imediato. O projeto oferece modo claro/escuro, componentes reutilizáveis e integrações prontas com o backend de envio via HTTP.

## Pré-requisitos

- Node.js **20.19** ou superior (ou >= 22.12). Versões anteriores exibem erros ao rodar o Vite.
- npm 10+ (instalado junto com o Node recomendado).

## Configuração rápida

```bash
cd compose/nginx
npm install

# Defina o endpoint do backend, se diferente do padrão
echo "VITE_EMAIL_API_URL=http://localhost:8080" > .env.local

# Ambiente de desenvolvimento
npm run dev
```

O servidor de desenvolvimento estará disponível em <http://localhost:5173>. A aplicação faz POST em `/emails` usando Axios, respeitando a variável `VITE_EMAIL_API_URL` (padrão `http://localhost:8080`).

## Build de produção

```bash
npm run build
# Opcional: validar build localmente
npm run preview
```

A saída final é gerada na pasta `dist/`.

## Servindo com Nginx

1. Gere o build (`npm run build`).
2. Copie o conteúdo de `dist/` para o diretório servido pelo Nginx (por exemplo, `/usr/share/nginx/html`).
3. Use o arquivo `nginx.conf` deste diretório como base. Ele inclui:
   - cache otimizado para `/assets/`;
   - fallback SPA (`try_files ... /index.html`);
   - proxy reverso para o backend em `/emails`.

Atualize `proxy_pass` e `server_name` conforme sua infraestrutura.

## Rodando com Docker Compose

```bash
docker compose up --build -d
```

- App disponível em: http://localhost:8081
- O Nginx dentro do container faz proxy de `/emails` para `http://host.docker.internal:8080/emails` (ideal se seu backend estiver rodando na máquina host na porta 8080). Em Linux, o compose adiciona a entrada `host.docker.internal` via `extra_hosts`.

Para usar um backend em container dentro do próprio Compose, descomente o serviço `backend` no `docker-compose.yml` e ajuste o `proxy_pass` no `nginx.conf` para apontar para `http://backend:8080/emails`.

## Funcionalidades principais

- **Design responsivo e moderno** inspirado em conceitos gerados por IA.
- **Formulário acessível** com validações, placeholders e orientações contextuais.
- **Feedback visual** durante o envio, com animações sutis e snackbar para sucesso/erro.
- **Suporte a temas** com `ThemeSwitcher`, transições suaves e persistência da preferência.
- **Arquitetura escalável** com componentes isolados (`EmailForm`, `Snackbar`, `ThemeSwitcher`) e estilização via `styled-components`.

## Scripts npm

- `npm run dev` – inicia o Vite em modo desenvolvimento.
- `npm run build` – executa o TypeScript (modo build) e gera o bundle de produção.
- `npm run preview` – serve o build gerado para inspeção.
- `npm run lint` – roda as regras de linting configuradas.

## Variáveis de ambiente

| Variável               | Descrição                                                | Padrão               |
| ---------------------- | -------------------------------------------------------- | -------------------- |
| `VITE_EMAIL_API_URL`   | URL base do backend de envio utilizado pelo Axios.       | `http://localhost:8080` |

Crie um arquivo `.env.local` para sobrescrever valores sem versionar.
VITE_EMAIL_API_URL=http://localhost:8080

## Próximos passos

- Ajustar o endpoint `/emails` caso o backend esteja atrás de outro host/porta.
- Conectar métricas de uso ou ferramentas de observabilidade se necessário.
- Personalizar temas adicionando novas paletas em `src/styles/themes.ts`.
