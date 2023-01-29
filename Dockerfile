FROM node:14.17.1

WORKDIR /app
COPY package*.json ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3001
CMD [ "yarn", "start" ]
