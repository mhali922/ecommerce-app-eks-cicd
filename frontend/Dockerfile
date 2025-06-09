# frontend/Dockerfile
FROM node:20 as build


# Pass environment variables as build arguments
ARG VITE_AUTH_API_URL
ARG VITE_PRODUCT_API_URL

# Set environment variables for Vite
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_PRODUCT_API_URL=$VITE_PRODUCT_API_URL


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
