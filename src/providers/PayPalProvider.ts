/**
 * PayPal Provider - Concrete Product Implementation
 * Medium-speed payment processing with good success rate
 */

import { PaymentProvider, PaymentResult } from './PaymentProvider.js';

export class PayPalProvider extends PaymentProvider {
    /**
     * Gets the provider name
     * @returns "PayPal"
     */
    getName(): string {
        return 'PayPal';
    }

    /**
     * Processes payment via PayPal
     * Simulates medium-speed API call (1500ms) with 90% success rate
     * @param amount - The amount to charge
     * @returns Promise resolving to PaymentResult
     */
    async processPayment(amount: number): Promise<PaymentResult> {
        // Simulate API delay
        await this.simulateDelay(1500);

        // Generate transaction ID
        const transactionId = this.generateTransactionId('PP');

        // Simulate success/failure (90% success rate)
        const success = Math.random() > 0.1;

        return {
            success,
            transactionId,
            message: success
                ? '✓ Payment successful via PayPal'
                : '✗ PayPal payment declined - insufficient funds',
            provider: 'PayPal'
        };
    }
}
