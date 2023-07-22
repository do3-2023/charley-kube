# Utiliser l'image Node.js en tant que base
FROM node:alpine

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

# Exposer le port du serveur Node.js
EXPOSE 3000

# Commande de démarrage du serveur
CMD [ "npm", "run", "start" ]
