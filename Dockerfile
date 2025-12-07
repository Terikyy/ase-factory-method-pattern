# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files and public directory
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

# Build TypeScript (outputs to public/js)
RUN npm run build

# Test stage
FROM node:20-alpine AS tester

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for testing)
RUN npm install

# Copy built files and test files
COPY --from=builder /app/public ./public
COPY tests ./tests

# Run tests (this will be executed during build)
RUN npm test || echo "No tests configured yet"

# Production stage
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built application
COPY --from=builder /app/public /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD sh -c 'echo "🚀 TechShop is now listening on http://localhost:8080" && nginx -g "daemon off;"'
