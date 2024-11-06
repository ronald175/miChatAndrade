# Etapa de construcción para el frontend (Angular)
FROM node:latest AS node-builder

COPY chatAndradeRonald/ /app/chatAndradeRonald/

WORKDIR /app/chatAndradeRonald

RUN npm install --force
RUN npm run build --prod

COPY server/package*.json /app/server/

WORKDIR /app/server


RUN npm install


COPY server/ /app/server/

FROM nginx:1.17.1-alpine
RUN apk add --update nodejs npm

COPY --from=node-builder /app/chatAndradeRonald/dist/chat-andrade-ronald /usr/share/nginx/html

COPY --from=node-builder /app/server/ /app/server

CMD ["sh", "-c", "node /app/server/src/app.js & nginx -g 'daemon off;'"]

EXPOSE 80        
EXPOSE 3001      
