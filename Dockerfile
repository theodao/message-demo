FROM node:alpine as message-app

WORKDIR /app

COPY ./package.json ./

RUN yarn

COPY ./ ./

CMD ["yarn", "build"]

FROM nginx:1.12-alpine

COPY --from=message-app /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]