/**
 * Payment Provider Abstract Class
 * Base class for all payment providers (Product in Factory Method Pattern)
 * Provides common functionality for all concrete providers
 */

/**
 * Result of a payment processing attempt
 */
export interface PaymentResult {
    success: boolean;
    transactionId: string;
    message: string;
    provider: string;
}

/**
 * Abstract Payment Provider Base Class
 * All concrete payment providers extend this class
 */
export abstract class PaymentProvider {
    /**
     * Gets the name of the payment provider
     * @returns The provider name
     */
    abstract getName(): string;

    /**
     * Processes a payment with the provider
     * @param amount - The amount to charge
     * @returns Promise resolving to PaymentResult
     */
    abstract processPayment(amount: number): Promise<PaymentResult>;

    /**
     * Simulates network delay (shared utility method)
     * @param ms - Milliseconds to delay
     * @protected
     */
    protected simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Generates a random string for transaction IDs (shared utility method)
     * @returns Random alphanumeric string
     * @protected
     */
    protected generateRandomString(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    /**
     * Generates a transaction ID with provider prefix
     * @param prefix - Provider-specific prefix (e.g., "AP", "PP", "CC")
     * @returns Full transaction ID
     * @protected
     */
    protected generateTransactionId(prefix: string): string {
        return `${prefix}-${Date.now()}-${this.generateRandomString()}`;
    }
}
