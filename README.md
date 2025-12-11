# Factory Method Pattern - TechShop

[![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&logoColor=white)](https://github.com/Terikyy/ase-factory-method-pattern) 
[![Live Demo - Heroku](https://img.shields.io/badge/Live%20Demo-Heroku-430098?logo=heroku&logoColor=white)](https://ase-factory-method-pattern-3145dcfade07.herokuapp.com)

Implementation of the Factory Method design pattern for Advanced Software Engineering at DHBW Stuttgart.

## Overview

This project demonstrates the **Factory Method** design pattern through a web-based e-commerce application (TechShop) that processes payments through multiple payment providers (PayPal, Credit Card, Apple Pay).

🚀 **Live Demo**: [TechShop Demo](https://ase-factory-method-pattern-3145dcfade07.herokuapp.com)

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
- **Tester stage**: Runs tests
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
- **Checkout Flow**: Complete billing form and order summary with mock payment processing

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
- **Jest**: Testing framework for unit tests
- **ts-jest**: TypeScript preprocessor for Jest
- **@jest/globals**: Jest global functions and types
- **@types/jest**: TypeScript type definitions for Jest

## Testing

The project includes comprehensive unit tests covering the Factory Method pattern implementation.

### Test Structure

- **tests/factories.test.ts**: Tests for all payment factory classes (9 tests)
  - Verifies correct instantiation of payment providers
  - Tests polymorphic behavior of factories
  - Ensures factories create new instances on each call

- **tests/providers.test.ts**: Tests for all payment provider implementations (18 tests)
  - Validates payment processing logic
  - Tests transaction ID generation
  - Verifies processing delays and timing characteristics
  - Compares provider performance

- **tests/service.test.ts**: Tests for PaymentService integration (18 tests)
  - Tests integration with all factory types
  - Validates amount validation (zero/negative amounts)
  - Tests console logging and formatting
  - Verifies async behavior and error handling

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## License

Educational project for DHBW Stuttgart.
