FROM node

WORKDIR /app

COPY package*.json ./
COPY tsconfig* ./

RUN npm install

COPY ./dist ./dist

CMD [ "npm", "run", "start:prod" ]