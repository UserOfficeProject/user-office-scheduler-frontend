FROM node:12-alpine as build-stage

WORKDIR /app
COPY package*.json /app/

RUN npm ci --only=production --silent

COPY ./ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.18-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html/scheduler

RUN mkdir -p /etc/nginx/templates
COPY ./default.conf.template /etc/nginx/templates
