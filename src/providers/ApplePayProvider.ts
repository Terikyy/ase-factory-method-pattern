/**
 * Apple Pay Provider - Concrete Product Implementation
 * Fast payment processing with high success rate
 */

import { PaymentProvider, PaymentResult } from './PaymentProvider.js';

export class ApplePayProvider extends PaymentProvider {
    /**
     * Gets the provider name
     * @returns "Apple Pay"
     */
    getName(): string {
        return 'Apple Pay';
    }

    /**
     * Processes payment via Apple Pay
     * Simulates fast API call (800ms) with 95% success rate
     * @param amount - The amount to charge
     * @returns Promise resolving to PaymentResult
     */
    async processPayment(amount: number): Promise<PaymentResult> {
        // Simulate API delay
        await this.simulateDelay(800);

        // Generate transaction ID
        const transactionId = this.generateTransactionId('AP');

        // Simulate success/failure (95% success rate)
        const success = Math.random() > 0.05;

        return {
            success,
            transactionId,
            message: success
                ? '✓ Payment authorized via Apple Pay'
                : '✗ Apple Pay authentication failed',
            provider: 'Apple Pay'
        };
    }
}
