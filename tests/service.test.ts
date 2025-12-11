/**
 * Unit Tests for PaymentService
 * Tests the service that uses the Factory Method Pattern
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PaymentService } from '../src/services/PaymentService.js';
import { CreditCardFactory } from '../src/factories/CreditCardFactory.js';
import { PayPalFactory } from '../src/factories/PayPalFactory.js';
import { ApplePayFactory } from '../src/factories/ApplePayFactory.js';
import { PaymentFactory } from '../src/factories/PaymentFactory.js';
import { PaymentProvider, PaymentResult } from '../src/providers/PaymentProvider.js';

// Mock provider for testing
class MockPaymentProvider extends PaymentProvider {
    constructor(
        private name: string,
        private shouldSucceed: boolean = true,
        private delay: number = 0
    ) {
        super();
    }

    getName(): string {
        return this.name;
    }

    async processPayment(_amount: number): Promise<PaymentResult> {
        if (this.delay > 0) {
            await this.simulateDelay(this.delay);
        }
        
        return {
            success: this.shouldSucceed,
            transactionId: `MOCK-${Date.now()}`,
            message: this.shouldSucceed ? 'Success' : 'Failed',
            provider: this.name
        };
    }
}

// Mock factory for testing
class MockPaymentFactory extends PaymentFactory {
    constructor(private provider: PaymentProvider) {
        super();
    }

    createPaymentProvider(): PaymentProvider {
        return this.provider;
    }
}

describe('PaymentService', () => {
    let service: PaymentService;

    beforeEach(() => {
        service = new PaymentService();
        // Suppress console.log output during tests
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    describe('Basic Functionality', () => {
        // Verify that the service can process payments successfully
        it('should process payment successfully with valid factory and amount', async () => {
            const factory = new CreditCardFactory();
            const result = await service.processPayment(factory, 100);
            
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('transactionId');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('provider');
        });

        // Test integration with CreditCard payment provider
        it('should work with CreditCardFactory', async () => {
            const factory = new CreditCardFactory();
            const result = await service.processPayment(factory, 50);
            
            expect(result.provider).toBe('Credit Card');
        });

        // Test integration with PayPal payment provider
        it('should work with PayPalFactory', async () => {
            const factory = new PayPalFactory();
            const result = await service.processPayment(factory, 75);
            
            expect(result.provider).toBe('PayPal');
        });

        // Test integration with Apple Pay payment provider
        it('should work with ApplePayFactory', async () => {
            const factory = new ApplePayFactory();
            const result = await service.processPayment(factory, 120);
            
            expect(result.provider).toBe('Apple Pay');
        });
    });

    describe('Amount Validation', () => {
        // Verify that zero amounts are rejected
        it('should throw error for zero amount', async () => {
            const factory = new CreditCardFactory();
            
            await expect(service.processPayment(factory, 0))
                .rejects
                .toThrow('Payment amount must be greater than zero');
        });

        // Verify that negative amounts are rejected
        it('should throw error for negative amount', async () => {
            const factory = new PayPalFactory();
            
            await expect(service.processPayment(factory, -50))
                .rejects
                .toThrow('Payment amount must be greater than zero');
        });

        // Verify that very small positive amounts are accepted
        it('should accept small positive amounts', async () => {
            const factory = new ApplePayFactory();
            const result = await service.processPayment(factory, 0.01);
            
            expect(result).toHaveProperty('success');
            expect(result.provider).toBe('Apple Pay');
        });

        // Verify that large amounts are accepted
        it('should accept large amounts', async () => {
            const factory = new CreditCardFactory();
            const result = await service.processPayment(factory, 999999.99);
            
            expect(result).toHaveProperty('success');
            expect(result.provider).toBe('Credit Card');
        });
    });

    describe('Factory Method Pattern Integration', () => {
        // Test that the service correctly uses the factory to create providers
        it('should use factory to create provider', async () => {
            const mockProvider = new MockPaymentProvider('TestProvider', true);
            const mockFactory = new MockPaymentFactory(mockProvider);
            
            const result = await service.processPayment(mockFactory, 100);
            
            expect(result.provider).toBe('TestProvider');
            expect(result.success).toBe(true);
        });

        // Verify that the service handles failed payments correctly
        it('should handle provider failures gracefully', async () => {
            const mockProvider = new MockPaymentProvider('FailProvider', false);
            const mockFactory = new MockPaymentFactory(mockProvider);
            
            const result = await service.processPayment(mockFactory, 100);
            
            expect(result.success).toBe(false);
            expect(result.message).toBe('Failed');
        });

        // Test that different factories can be used through the common interface
        it('should work with different factories polymorphically', async () => {
            const factories: PaymentFactory[] = [
                new CreditCardFactory(),
                new PayPalFactory(),
                new ApplePayFactory()
            ];
            
            const results = await Promise.all(
                factories.map(factory => service.processPayment(factory, 100))
            );
            
            expect(results).toHaveLength(3);
            expect(results[0].provider).toBe('Credit Card');
            expect(results[1].provider).toBe('PayPal');
            expect(results[2].provider).toBe('Apple Pay');
        });
    });

    describe('Console Logging', () => {
        // Verify that processing information is logged to console
        it('should log processing message', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const factory = new CreditCardFactory();
            
            await service.processPayment(factory, 100);
            
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Processing $100.00')
            );
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Credit Card')
            );
        });

        // Verify that payment results are logged to console
        it('should log result message', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const mockProvider = new MockPaymentProvider('TestProvider', true);
            const mockFactory = new MockPaymentFactory(mockProvider);
            
            await service.processPayment(mockFactory, 50);
            
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('✓')
            );
        });

        // Verify that amounts are formatted correctly with two decimal places
        it('should format amount with two decimal places', async () => {
            const consoleSpy = jest.spyOn(console, 'log');
            const factory = new PayPalFactory();
            
            await service.processPayment(factory, 123.456);
            
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('$123.46')
            );
        });
    });

    describe('Async Behavior', () => {
        // Test that the service correctly handles asynchronous payment processing
        it('should handle async payment processing', async () => {
            const mockProvider = new MockPaymentProvider('AsyncProvider', true, 100);
            const mockFactory = new MockPaymentFactory(mockProvider);
            
            const startTime = Date.now();
            const result = await service.processPayment(mockFactory, 100);
            const duration = Date.now() - startTime;
            
            expect(result.success).toBe(true);
            expect(duration).toBeGreaterThanOrEqual(90);
        });

        // Verify that multiple payments can be processed in parallel
        it('should process multiple payments concurrently', async () => {
            const factories = [
                new ApplePayFactory(),
                new ApplePayFactory(),
                new ApplePayFactory()
            ];
            
            const startTime = Date.now();
            const results = await Promise.all(
                factories.map(f => service.processPayment(f, 100))
            );
            const duration = Date.now() - startTime;
            
            expect(results).toHaveLength(3);
            // Should take roughly same time as single payment (concurrent execution)
            expect(duration).toBeLessThan(1500); // Less than 2x single payment time
        });
    });

    describe('Edge Cases', () => {
        // Test handling of very small decimal values
        it('should handle very small decimal amounts', async () => {
            const factory = new ApplePayFactory();
            const result = await service.processPayment(factory, 0.001);
            
            expect(result).toHaveProperty('success');
        });

        // Test handling of amounts with high precision
        it('should handle amounts with many decimal places', async () => {
            const factory = new PayPalFactory();
            const result = await service.processPayment(factory, 99.999999);
            
            expect(result).toHaveProperty('success');
        });

        // Verify that each payment uses a new provider instance
        it('should create new provider instance for each payment', async () => {
            const factory = new CreditCardFactory();
            
            const result1 = await service.processPayment(factory, 100);
            const result2 = await service.processPayment(factory, 100);
            
            // Transaction IDs should be different (different instances)
            expect(result1.transactionId).not.toBe(result2.transactionId);
        });
    });
});
