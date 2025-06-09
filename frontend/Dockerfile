# frontend/Dockerfile
ARG VITE_AUTH_API_URL
ARG VITE_PRODUCT_API_URL
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_PRODUCT_API_URL=$VITE_PRODUCT_API_URL


FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
