/**
 * PayPal Factory (Concrete Creator)
 * 
 * Implements the factory method to create PayPalProvider instances
 * Following GoF Factory Method Pattern - each concrete creator is responsible
 * for instantiating a specific concrete product
 */

import { PaymentFactory } from './PaymentFactory.js';
import { PaymentProvider } from '../providers/PaymentProvider.js';
import { PayPalProvider } from '../providers/PayPalProvider.js';

/**
 * Concrete Creator for PayPal
 * Overrides the factory method to return PayPalProvider instances
 */
export class PayPalFactory extends PaymentFactory {
    /**
     * Factory Method Implementation
     * Creates and returns a PayPalProvider instance
     * @returns PayPalProvider instance
     */
    createPaymentProvider(): PaymentProvider {
        return new PayPalProvider();
    }
}
