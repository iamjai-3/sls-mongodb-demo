FROM node:14.17.1

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g serverless
RUN npm install


COPY . .

EXPOSE 3000

