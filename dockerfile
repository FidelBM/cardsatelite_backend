FROM node:21-alpine3.19
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start:dev"]