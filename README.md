# Factory Method Pattern - TechShop

Implementation of the Factory Method design pattern for Advanced Software Engineering at DHBW Stuttgart.

## Overview

This project demonstrates the **Factory Method** design pattern through a web-based e-commerce application (TechShop) that processes payments through multiple payment providers (PayPal, Credit Card, Apple Pay).

## Setup

### Docker Setup (Recommended)

The application is containerized using Docker with a multi-stage build process:

1. **Build the Docker image and run the container:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   Open your browser to [http://localhost:8080](http://localhost:8080)

The Dockerfile uses a multi-stage build:
- **Builder stage**: Compiles TypeScript to JavaScript
- **Tester stage**: Runs tests (to be implemented)
- **Production stage**: Serves the app with Nginx

### Local Setup (Without Docker)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build TypeScript files:**
   ```bash
   npm run build
   ```

3. **Serve the `public` directory with any static server:**
   ```bash
   # Example with Python
   cd public && python3 -m http.server 8080
   
   # Example with Node.js http-server
   npx http-server public -p 8080
   ```

4. **Open your browser to** [http://localhost:8080](http://localhost:8080)

## Features

- **Product Catalog**: Browse and add tech products to cart (Laptop, Headphones, Keyboard)
- **Shopping Cart**: Manage cart items with persistent storage using localStorage
- **Multiple Payment Methods**:
  - **PayPal**: Simulated PayPal payment processing
  - **Credit Card**: Simulated credit card payment processing
  - **Apple Pay**: Simulated Apple Pay payment processing
- **Factory Method Pattern**: Each payment provider is created through its dedicated factory
- **Checkout Flow**: Complete billing form and order summary with payment processing

## Architecture

The project follows the Factory Method pattern with:

- **Abstract Product**: `PaymentProvider` - abstract base class defining the payment processing contract
- **Concrete Products**: `PayPalProvider`, `CreditCardProvider`, `ApplePayProvider` - extend the abstract class with specific payment strategies
- **Abstract Creator**: `PaymentFactory` - abstract class declaring the factory method
- **Concrete Creators**: `PayPalFactory`, `CreditCardFactory`, `ApplePayFactory` - extend the abstract factory to instantiate specific payment providers

### Key Classes

- **PaymentService**: Orchestrates payment processing using factories
- **Product**: Data model for shop products
- **Cart Helpers**: Utility functions for cart management
- **UI Helpers**: Loading states and user interface updates

## Technologies

- **TypeScript**: Strongly-typed implementation with ES modules
- **HTML/CSS**: Responsive web interface
- **Docker**: Containerized deployment with Nginx

## Dependencies

No external runtime dependencies - this is a vanilla TypeScript project demonstrating pure Factory Method pattern implementation without frameworks or libraries.

**Dev Dependencies:**
- **TypeScript**: Type checking and compilation to JavaScript

## Testing

Testing infrastructure is in place but tests are pending implementation. Run:

```bash
npm test
```

## License

Educational project for DHBW Stuttgart.
