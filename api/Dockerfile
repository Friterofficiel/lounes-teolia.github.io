# Utiliser une image de base Node.js
FROM node:14

# Créer un répertoire de travail pour l'API
WORKDIR /usr/src/app

# Copier les fichiers de dépendances du package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source de l'API
COPY . .

# Compiler le code source (s'il est nécessaire)
RUN npm run build

# Exposer le port sur lequel l'API fonctionnera
EXPOSE 3000

# Commande pour exécuter l'API
CMD [ "node", "./dist/index.js" ]
