FROM node:lts


COPY . /server
WORKDIR /server
RUN yarn install

CMD ["yarn", "prod"]