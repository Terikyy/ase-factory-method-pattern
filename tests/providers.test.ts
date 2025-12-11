/**
 * Unit Tests for Payment Provider Classes
 * Tests the concrete product implementations
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { CreditCardProvider } from '../src/providers/CreditCardProvider.js';
import { PayPalProvider } from '../src/providers/PayPalProvider.js';
import { ApplePayProvider } from '../src/providers/ApplePayProvider.js';
import { PaymentResult } from '../src/providers/PaymentProvider.js';

describe('Payment Providers', () => {
    describe('CreditCardProvider', () => {
        let provider: CreditCardProvider;

        beforeEach(() => {
            provider = new CreditCardProvider();
        });

        // Verify the provider returns its correct name
        it('should return correct provider name', () => {
            expect(provider.getName()).toBe('Credit Card');
        });

        it('should process payment and return PaymentResult', async () => {
            const result = await provider.processPayment(100);
            
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('transactionId');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('provider');
            expect(result.provider).toBe('Credit Card');
            expect(typeof result.success).toBe('boolean');
            expect(typeof result.transactionId).toBe('string');
            expect(typeof result.message).toBe('string');
        });

        // Ensure transaction IDs follow the expected format (CC-timestamp-random)
        it('should generate transaction ID with CC prefix', async () => {
            const result = await provider.processPayment(50);
            
            expect(result.transactionId).toMatch(/^CC-\d+-[a-z0-9]+$/);
        });

        it('should simulate processing delay', async () => {
            const startTime = Date.now();
            await provider.processPayment(100);
            const endTime = Date.now();
            
            const duration = endTime - startTime;
            // Should take approximately 2000ms (allowing some margin)
            expect(duration).toBeGreaterThanOrEqual(1900);
            expect(duration).toBeLessThan(2200);
        });

        // Check that success messages contain appropriate indicators
        it('should return appropriate success message when successful', async () => {
            // Run multiple times to eventually get a success
            let successResult: PaymentResult | null = null;
            for (let i = 0; i < 20; i++) {
                const result = await provider.processPayment(100);
                if (result.success) {
                    successResult = result;
                    break;
                }
            }
            
            if (successResult) {
                expect(successResult.message).toContain('✓');
                expect(successResult.message).toContain('successfully');
            }
        });

        // Check that failure messages contain appropriate indicators
        it('should return appropriate failure message when declined', async () => {
            // Run multiple times to eventually get a failure
            let failureResult: PaymentResult | null = null;
            for (let i = 0; i < 50; i++) {
                const result = await provider.processPayment(100);
                if (!result.success) {
                    failureResult = result;
                    break;
                }
            }
            
            if (failureResult) {
                expect(failureResult.message).toContain('✗');
                expect(failureResult.message).toContain('declined');
            }
        }, 120000);
    });

    describe('PayPalProvider', () => {
        let provider: PayPalProvider;

        beforeEach(() => {
            provider = new PayPalProvider();
        });

        // Verify the provider returns its correct name
        it('should return correct provider name', () => {
            expect(provider.getName()).toBe('PayPal');
        });

        // Check that payment processing returns all required result fields
        it('should process payment and return PaymentResult', async () => {
            const result = await provider.processPayment(100);
            
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('transactionId');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('provider');
            expect(result.provider).toBe('PayPal');
        });

        // Ensure transaction IDs follow the expected format (PP-timestamp-random)
        it('should generate transaction ID with PP prefix', async () => {
            const result = await provider.processPayment(50);
            
            expect(result.transactionId).toMatch(/^PP-\d+-[a-z0-9]+$/);
        });

        // Verify that the provider simulates realistic processing time
        it('should simulate processing delay', async () => {
            const startTime = Date.now();
            await provider.processPayment(100);
            const endTime = Date.now();
            
            const duration = endTime - startTime;
            // Should take approximately 1500ms
            expect(duration).toBeGreaterThanOrEqual(1400);
            expect(duration).toBeLessThan(1700);
        });

        it('should return appropriate messages', async () => {
            const result = await provider.processPayment(100);
            
            if (result.success) {
                expect(result.message).toContain('✓');
            } else {
                expect(result.message).toContain('✗');
                expect(result.message).toContain('PayPal');
            }
        });
    });

    describe('ApplePayProvider', () => {
        let provider: ApplePayProvider;

        beforeEach(() => {
            provider = new ApplePayProvider();
        });

        // Verify the provider returns its correct name
        it('should return correct provider name', () => {
            expect(provider.getName()).toBe('Apple Pay');
        });

        // Check that payment processing returns all required result fields
        it('should process payment and return PaymentResult', async () => {
            const result = await provider.processPayment(100);
            
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('transactionId');
            expect(result).toHaveProperty('message');
            expect(result).toHaveProperty('provider');
            expect(result.provider).toBe('Apple Pay');
        });

        // Ensure transaction IDs follow the expected format (AP-timestamp-random)
        it('should generate transaction ID with AP prefix', async () => {
            const result = await provider.processPayment(50);
            
            expect(result.transactionId).toMatch(/^AP-\d+-[a-z0-9]+$/);
        });

        // Verify that the provider simulates realistic processing time
        it('should simulate processing delay', async () => {
            const startTime = Date.now();
            await provider.processPayment(100);
            const endTime = Date.now();
            
            const duration = endTime - startTime;
            // Should take approximately 800ms
            expect(duration).toBeGreaterThanOrEqual(700);
            expect(duration).toBeLessThan(1000);
        });

        it('should return appropriate messages', async () => {
            const result = await provider.processPayment(100);
            
            if (result.success) {
                expect(result.message).toContain('✓');
                expect(result.message).toContain('Apple Pay');
            } else {
                expect(result.message).toContain('✗');
            }
        });

        // Verify that Apple Pay processes faster than PayPal
        it('should be fastest provider', async () => {
            const applePayProvider = new ApplePayProvider();
            const payPalProvider = new PayPalProvider();
            
            const applePayStart = Date.now();
            await applePayProvider.processPayment(100);
            const applePayDuration = Date.now() - applePayStart;
            
            const payPalStart = Date.now();
            await payPalProvider.processPayment(100);
            const payPalDuration = Date.now() - payPalStart;
            
            expect(applePayDuration).toBeLessThan(payPalDuration);
        });
    });

    describe('Provider Comparison', () => {
        // Test that providers have different processing times (ApplePay < PayPal < CreditCard)
        it('should have different processing speeds', async () => {
            const creditCard = new CreditCardProvider();
            const payPal = new PayPalProvider();
            const applePay = new ApplePayProvider();
            
            const ccStart = Date.now();
            await creditCard.processPayment(100);
            const ccDuration = Date.now() - ccStart;
            
            const ppStart = Date.now();
            await payPal.processPayment(100);
            const ppDuration = Date.now() - ppStart;
            
            const apStart = Date.now();
            await applePay.processPayment(100);
            const apDuration = Date.now() - apStart;
            
            // Apple Pay should be fastest, Credit Card slowest
            expect(apDuration).toBeLessThan(ppDuration);
            expect(ppDuration).toBeLessThan(ccDuration);
        });

        // Ensure each provider generates unique transaction IDs
        it('should all generate unique transaction IDs', async () => {
            const providers = [
                new CreditCardProvider(),
                new PayPalProvider(),
                new ApplePayProvider()
            ];
            
            const transactionIds = await Promise.all(
                providers.map(p => p.processPayment(100).then(r => r.transactionId))
            );
            
            const uniqueIds = new Set(transactionIds);
            expect(uniqueIds.size).toBe(transactionIds.length);
        });
    });
});
