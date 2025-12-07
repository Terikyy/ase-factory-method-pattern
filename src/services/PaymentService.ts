/**
 * Payment Service
 * 
 * Demonstrates the Factory Method Pattern by using payment factories
 * to create providers without depending on concrete classes.
 */

import { PaymentFactory } from '../factories/PaymentFactory.js';
import { PaymentResult } from '../providers/PaymentProvider.js';

export class PaymentService {
    /**
     * Processes a payment using the provided factory
     * @param factory - The payment factory to use
     * @param amount - The amount to charge (must be greater than 0)
     * @returns Promise resolving to PaymentResult
     */
    async processPayment(factory: PaymentFactory, amount: number): Promise<PaymentResult> {
        // Validate amount
        if (amount <= 0) {
            throw new Error('Payment amount must be greater than zero');
        }

        // Use factory to create the appropriate provider
        const provider = factory.createPaymentProvider();
        
        // Process the payment
        console.log(`Processing $${amount.toFixed(2)} with ${provider.getName()}...`);
        const result = await provider.processPayment(amount);
        
        // Log result
        console.log(result.success ? `✓ ${result.message}` : `✗ ${result.message}`);
        
        return result;
    }
}
