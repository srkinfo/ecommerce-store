FROM node:18

WORKDIR /app

# Copy package.json first for caching npm install
COPY package*.json ./

RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port from .env
EXPOSE 3000

# Start app
CMD ["npm", "start"]
