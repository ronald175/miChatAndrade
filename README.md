<h1>TRABAJO DE CHAT</h1>
<p>Ronald Paul Andrade Perez

<p>------------------------

<p>Documentacion del Dockerfile

# Etapa de construcción para el frontend (Angular)
FROM node:latest AS node-builder

# Copiar el código del frontend a la carpeta de trabajo
COPY chatAndradeRonald/ /app/chatAndradeRonald/

# Establecer el directorio de trabajo para el frontend
WORKDIR /app/chatAndradeRonald

# Instalar dependencias y construir la aplicación Angular
RUN npm install --force
RUN npm run build --prod

# Preparar la instalación del backend (Node.js)
COPY server/package*.json /app/server/

# Establecer el directorio de trabajo para el backend
WORKDIR /app/server

# Instalar las dependencias del backend
RUN npm install

# Copiar el código del backend
COPY server/ /app/server/

# Etapa final usando Nginx para servir el frontend y ejecutar el backend
FROM nginx:1.17.1-alpine
RUN apk add --update nodejs npm

# Copiar el frontend construido en la carpeta pública de Nginx
COPY --from=node-builder /app/chatAndradeRonald/dist/chatAndradeRonald /usr/share/nginx/html

# Copiar el backend para que se ejecute en el mismo contenedor
COPY --from=node-builder /app/server/ /app/server

# Comando para iniciar el backend y Nginx
CMD ["sh", "-c", "node /app/server/src/app.js & nginx -g 'daemon off;'"]

# Exponer los puertos necesarios
EXPOSE 80        # Puerto para Nginx (frontend)
EXPOSE 3001      # Puerto para el backend Node.js (WebSocket o API)

