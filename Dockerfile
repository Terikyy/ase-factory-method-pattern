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

# Copy configuration files
COPY tsconfig.json ./
COPY jest.config.js ./

# Copy source files and test files
COPY src ./src
COPY tests ./tests

# Run tests
RUN npm test

# Production stage
FROM nginx:alpine AS production

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Ensure tests pass before building production image
COPY --from=tester /app/package.json /tmp/test-marker.json

# Copy built application from builder stage
COPY --from=builder /app/public /usr/share/nginx/html

# Copy nginx configuration template
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy and set executable permission for entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
