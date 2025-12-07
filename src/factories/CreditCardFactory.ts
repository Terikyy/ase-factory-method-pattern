/**
 * Credit Card Factory (Concrete Creator)
 * 
 * Implements the factory method to create CreditCardProvider instances
 * Following GoF Factory Method Pattern - each concrete creator is responsible
 * for instantiating a specific concrete product
 */

import { PaymentFactory } from './PaymentFactory.js';
import { PaymentProvider } from '../providers/PaymentProvider.js';
import { CreditCardProvider } from '../providers/CreditCardProvider.js';

/**
 * Concrete Creator for Credit Card
 * Overrides the factory method to return CreditCardProvider instances
 */
export class CreditCardFactory extends PaymentFactory {
    /**
     * Factory Method Implementation
     * Creates and returns a CreditCardProvider instance
     * @returns CreditCardProvider instance
     */
    createPaymentProvider(): PaymentProvider {
        return new CreditCardProvider();
    }
}
