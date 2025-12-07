/**
 * Apple Pay Factory (Concrete Creator)
 * 
 * Implements the factory method to create ApplePayProvider instances
 * Following GoF Factory Method Pattern - each concrete creator is responsible
 * for instantiating a specific concrete product
 */

import { PaymentFactory } from './PaymentFactory.js';
import { PaymentProvider } from '../providers/PaymentProvider.js';
import { ApplePayProvider } from '../providers/ApplePayProvider.js';

/**
 * Concrete Creator for Apple Pay
 * Overrides the factory method to return ApplePayProvider instances
 */
export class ApplePayFactory extends PaymentFactory {
    /**
     * Factory Method Implementation
     * Creates and returns an ApplePayProvider instance
     * @returns ApplePayProvider instance
     */
    createPaymentProvider(): PaymentProvider {
        return new ApplePayProvider();
    }
}
