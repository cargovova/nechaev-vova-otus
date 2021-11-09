FROM node

WORKDIR /app

COPY package*.json ./
COPY tsconfig* ./

RUN npm install

COPY ./dist ./dist
COPY ./.env ./dist/.env

CMD [ "npm", "run", "start:prod" ]