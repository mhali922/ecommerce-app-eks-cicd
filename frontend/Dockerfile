# frontend/Dockerfile
FROM node:20 as build


# Pass environment variables as build arguments
ARG REACT_APP_AUTH_API_URL
ARG REACT_APP_PRODUCT_API_URL

# Set environment variables for Vite
ENV REACT_APP_AUTH_API_URL=$REACT_APP_AUTH_API_URL
ENV REACT_APP_PRODUCT_API_URL=$REACT_APP_PRODUCT_API_URL


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
