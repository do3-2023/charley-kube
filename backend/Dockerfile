# Étape 1 : Construction de l'application
FROM node as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm ci --only=production

RUN rm package*.json

EXPOSE 3000

# Commande de démarrage de l'application
CMD [ "node", "dist/index.js" ]
