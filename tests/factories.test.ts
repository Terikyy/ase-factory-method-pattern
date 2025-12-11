/**
 * Unit Tests for Payment Factory Classes
 * Tests the Factory Method Pattern implementation
 */

import { describe, it, expect } from '@jest/globals';
import { PaymentFactory } from '../src/factories/PaymentFactory.js';
import { CreditCardFactory } from '../src/factories/CreditCardFactory.js';
import { PayPalFactory } from '../src/factories/PayPalFactory.js';
import { ApplePayFactory } from '../src/factories/ApplePayFactory.js';
import { CreditCardProvider } from '../src/providers/CreditCardProvider.js';
import { PayPalProvider } from '../src/providers/PayPalProvider.js';
import { ApplePayProvider } from '../src/providers/ApplePayProvider.js';

describe('PaymentFactory Pattern', () => {
    describe('CreditCardFactory', () => {
        // Verify that the factory creates the correct provider type
        it('should create a CreditCardProvider instance', () => {
            const factory = new CreditCardFactory();
            const provider = factory.createPaymentProvider();
            
            expect(provider).toBeInstanceOf(CreditCardProvider);
            expect(provider.getName()).toBe('Credit Card');
        });

        // Ensure each factory call returns a new instance (not a singleton)
        it('should create different instances on multiple calls', () => {
            const factory = new CreditCardFactory();
            const provider1 = factory.createPaymentProvider();
            const provider2 = factory.createPaymentProvider();
            
            expect(provider1).not.toBe(provider2);
            expect(provider1).toBeInstanceOf(CreditCardProvider);
            expect(provider2).toBeInstanceOf(CreditCardProvider);
        });
    });

    describe('PayPalFactory', () => {
        // Verify that the factory creates the correct provider type
        it('should create a PayPalProvider instance', () => {
            const factory = new PayPalFactory();
            const provider = factory.createPaymentProvider();
            
            expect(provider).toBeInstanceOf(PayPalProvider);
            expect(provider.getName()).toBe('PayPal');
        });

        // Ensure each factory call returns a new instance
        it('should create different instances on multiple calls', () => {
            const factory = new PayPalFactory();
            const provider1 = factory.createPaymentProvider();
            const provider2 = factory.createPaymentProvider();
            
            expect(provider1).not.toBe(provider2);
            expect(provider1).toBeInstanceOf(PayPalProvider);
            expect(provider2).toBeInstanceOf(PayPalProvider);
        });
    });

    describe('ApplePayFactory', () => {
        // Verify that the factory creates the correct provider type
        it('should create an ApplePayProvider instance', () => {
            const factory = new ApplePayFactory();
            const provider = factory.createPaymentProvider();
            
            expect(provider).toBeInstanceOf(ApplePayProvider);
            expect(provider.getName()).toBe('Apple Pay');
        });

        // Ensure each factory call returns a new instance
        it('should create different instances on multiple calls', () => {
            const factory = new ApplePayFactory();
            const provider1 = factory.createPaymentProvider();
            const provider2 = factory.createPaymentProvider();
            
            expect(provider1).not.toBe(provider2);
            expect(provider1).toBeInstanceOf(ApplePayProvider);
            expect(provider2).toBeInstanceOf(ApplePayProvider);
        });
    });

    describe('Factory Method Pattern Polymorphism', () => {
        // Test that all factories can be used through the common interface
        it('should allow treating different factories polymorphically', () => {
            const factories: PaymentFactory[] = [
                new CreditCardFactory(),
                new PayPalFactory(),
                new ApplePayFactory()
            ];

            const providers = factories.map(factory => factory.createPaymentProvider());
            
            expect(providers).toHaveLength(3);
            expect(providers[0].getName()).toBe('Credit Card');
            expect(providers[1].getName()).toBe('PayPal');
            expect(providers[2].getName()).toBe('Apple Pay');
        });
    });
});
