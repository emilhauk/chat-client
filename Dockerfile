FROM nginx:alpine

WORKDIR /app
COPY . .
RUN apk add npm nodejs
RUN npm install
RUN npm run build

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9000
