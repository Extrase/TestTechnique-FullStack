 #build
FROM node:20-alpine AS builder

WORKDIR /app

# copie package.json et package-lock.json
COPY package*.json ./
RUN npm install

# copie le code source
COPY . .

# cuild l'application
RUN npm run build

# production avec Nginx
FROM nginx:alpine

# copie les fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html

# copie la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# cxpose le port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]