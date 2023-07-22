# Étape de construction : Utiliser l'image Node.js en tant que base
FROM node:alpine AS build

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Compiler les fichiers TypeScript en JavaScript
RUN npm run build

# Étape de production : Utiliser l'image Node.js plus légère
FROM node:alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

# Exposer le port du serveur Node.js (assurez-vous que c'est le même que celui utilisé dans votre application)
EXPOSE 5000

# Commande de démarrage du serveur
CMD [ "node", "./dist/index.js" ]
