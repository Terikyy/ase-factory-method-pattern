/**
 * Abstract Payment Factory (Creator in Factory Method Pattern)
 * 
 * Following Gang of Four Factory Method Pattern:
 * - Defines an abstract factory method that subclasses must implement
 * - Delegates object creation to subclasses
 */

import { PaymentProvider } from '../providers/PaymentProvider.js';

/**
 * Abstract Creator Class
 * Declares the factory method that returns PaymentProvider objects
 */
export abstract class PaymentFactory {
    /**
     * Factory Method - must be implemented by concrete creators
     * This is the core of the Factory Method Pattern.
     * Each concrete creator decides which concrete product to instantiate.
     * 
     * @returns A concrete PaymentProvider instance
     */
    abstract createPaymentProvider(): PaymentProvider;
}
