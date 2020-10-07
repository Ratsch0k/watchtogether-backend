FROM node:lts

COPY . /server
WORKDIR /server
CMD ["node", "/server/bin/www"]