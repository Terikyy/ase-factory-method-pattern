/**
 * Credit Card Provider - Concrete Product Implementation
 * Slower payment processing (bank validation) with lower success rate
 */

import { PaymentProvider, PaymentResult } from './PaymentProvider.js';

export class CreditCardProvider extends PaymentProvider {
    /**
     * Gets the provider name
     * @returns "Credit Card"
     */
    getName(): string {
        return 'Credit Card';
    }

    /**
     * Processes payment via Credit Card
     * Simulates slower API call (2000ms) with 85% success rate
     * @param amount - The amount to charge
     * @returns Promise resolving to PaymentResult
     */
    async processPayment(amount: number): Promise<PaymentResult> {
        // Simulate API delay (bank validation takes longer)
        await this.simulateDelay(2000);

        // Generate transaction ID
        const transactionId = this.generateTransactionId('CC');

        // Simulate success/failure (85% success rate)
        const success = Math.random() > 0.15;

        return {
            success,
            transactionId,
            message: success
                ? '✓ Credit Card charged successfully'
                : '✗ Credit Card declined - contact your bank',
            provider: 'Credit Card'
        };
    }
}
