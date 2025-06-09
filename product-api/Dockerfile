# Use official Node.js base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port (change if needed)
EXPOSE 3001

# Start the app
CMD ["node", "index.js"]
