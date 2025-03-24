FROM node:latest

COPY . /CrawJUD
WORKDIR /CrawJUD
COPY package.json package-lock.json /CrawJUD/
WORKDIR /CrawJUD
RUN npm install
RUN npm install -g server



RUN npm run build

EXPOSE 3000
CMD ["server", "build", "-p", "3000"]
