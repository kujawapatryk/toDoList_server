ARG NODE_VERSION=16.14.0

FROM node:${NODE_VERSION}-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /api


COPY package.json yarn.lock tsconfig.json ./

# Zainstaluj zależności
RUN yarn install

COPY . ./

# Skopiuj resztę plików
ENV NODE_ENV=production

RUN yarn run build

RUN yarn install

# Expose port, na którym działa aplikacja backendowa (zakładam, że to 5000, ale dostosuj do swoich potrzeb)
EXPOSE 5000

# Uruchom skompilowaną aplikację
CMD ["node", "./dist/main.js"]
# Zakładam, że punktem wejścia Twojej aplikacji jest index.js w katalogu dist. Dostosuj ścieżkę do swoich potrzeb.
