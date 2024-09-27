FROM node:18-alpine

WORKDIR /code

COPY /public/ /code/public/
COPY /src/ /code/src/
COPY package.json /code/
COPY tsconfig.json /code/

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]