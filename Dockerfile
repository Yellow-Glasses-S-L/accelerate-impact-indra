# Static site servido por Caddy con CSP permisiva (Alpine.js necesita unsafe-eval)
FROM caddy:2-alpine

# Copiar Caddyfile primero (cache layer)
COPY Caddyfile /etc/caddy/Caddyfile

# Copiar sitio
COPY . /app

# Railway inyecta PORT como variable
EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
