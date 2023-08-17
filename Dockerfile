# Build stage
FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY --from=build /usr/src/app/round-1 /usr/share/nginx/html/round-1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
