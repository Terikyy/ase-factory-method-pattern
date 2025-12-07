/**
 * Checkout Page - Payment Processing with Factory Method Pattern
 * 
 * This module demonstrates the Factory Method Pattern by:
 * - Mapping payment method selections to concrete factory instances
 * - Using PaymentService to process payments without knowing concrete provider types
 * - Switching between different payment providers at runtime
 */

import { clearCart, getCart, getTotal } from './utils/cartHelpers.js';
import { updateCartDisplay } from './utils/cartDisplayHelpers.js';
import { showLoading, hideLoading } from './utils/loadingHelpers.js';
import { PaymentService } from './services/PaymentService.js';
import { PaymentFactory } from './factories/PaymentFactory.js';
import { ApplePayFactory } from './factories/ApplePayFactory.js';
import { PayPalFactory } from './factories/PayPalFactory.js';
import { CreditCardFactory } from './factories/CreditCardFactory.js';

// Map payment method strings to factory instances
// This demonstrates the Factory Method Pattern - client code works with factories,
// not concrete provider classes
const paymentFactories: Record<string, PaymentFactory> = {
    'PayPal': new PayPalFactory(),
    'ApplePay': new ApplePayFactory(),
    'Credit Card': new CreditCardFactory(),
};

// Create payment service instance
const paymentService = new PaymentService();

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Display cart items and totals
    updateCartDisplay();

    // Get payment elements
    const paymentSelect = document.getElementById('payment-select') as HTMLSelectElement;
    const paymentBtn = document.getElementById('payment-btn') as HTMLButtonElement;
    
    // Populate payment options dynamically from factory mapping
    if (paymentSelect) {
        paymentSelect.innerHTML = '';
        Object.keys(paymentFactories).forEach((method) => {
            const option = document.createElement('option');
            option.value = method;
            option.textContent = method;
            paymentSelect.appendChild(option);
        });
        
        // Set initial button text
        if (paymentBtn && paymentSelect.value) {
            paymentBtn.textContent = `Pay with ${paymentSelect.value}`;
        }
    }

    // Clear cart button handler
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            clearCart();
            updateCartDisplay();
        });
    }

    if (!paymentSelect || !paymentBtn) {
        console.error('Payment elements not found');
        return;
    }

    // Update button text when payment method changes
    paymentSelect.addEventListener('change', () => {
        const selectedMethod = paymentSelect.value;
        paymentBtn.textContent = `Pay with ${selectedMethod}`;
    });

    // Handle payment button click
    paymentBtn.addEventListener('click', async () => {
        const selectedMethod = paymentSelect.value;
        const cart = getCart();
        const total = getTotal();

        // Validate cart
        if (cart.length === 0) {
            // Show error feedback
            paymentBtn.textContent = 'Cart is empty!';
            paymentBtn.style.background = 'var(--error-color)';
            
            setTimeout(() => {
                paymentBtn.textContent = `Pay with ${selectedMethod}`;
                paymentBtn.style.background = 'var(--accent-primary)';
            }, 2000);
            return;
        }

        // Validate amount
        if (total <= 0) {
            // Show error feedback
            paymentBtn.textContent = 'Invalid amount!';
            paymentBtn.style.background = 'var(--error-color)';
            
            setTimeout(() => {
                paymentBtn.textContent = `Pay with ${selectedMethod}`;
                paymentBtn.style.background = 'var(--accent-primary)';
            }, 2000);
            return;
        }

        // Get the appropriate factory for selected payment method
        const factory = paymentFactories[selectedMethod];
        if (!factory) {
            // Show error feedback
            paymentBtn.textContent = 'Invalid payment method!';
            paymentBtn.style.background = 'var(--error-color)';
            
            setTimeout(() => {
                paymentBtn.textContent = `Pay with ${selectedMethod}`;
                paymentBtn.style.background = 'var(--accent-primary)';
            }, 2000);
            return;
        }

        try {
            // Disable button during processing
            paymentBtn.disabled = true;
            paymentBtn.textContent = 'Processing...';
            paymentBtn.style.background = 'var(--accent-primary)';

            // Show loading overlay
            showLoading(`Processing payment with ${selectedMethod}...`);

            // Process payment using Factory Method Pattern
            // The service doesn't know which concrete provider it's using
            const result = await paymentService.processPayment(factory, total);

            // Hide loading
            hideLoading();

            // Store result in sessionStorage
            sessionStorage.setItem('paymentResult', JSON.stringify({
                success: result.success,
                transactionId: result.transactionId,
                message: result.message,
                provider: result.provider,
                amount: total
            }));

            // Clear cart on success
            if (result.success) {
                clearCart();
            }

            // Redirect to result page
            window.location.href = 'payment-result.html';

        } catch (error) {
            hideLoading();
            
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            
            // Store error result
            sessionStorage.setItem('paymentResult', JSON.stringify({
                success: false,
                transactionId: `ERR-${Date.now()}`,
                message: errorMessage,
                provider: selectedMethod,
                amount: total
            }));

            // Redirect to result page
            window.location.href = 'payment-result.html';
            
            console.error('Payment processing error:', error);
        }
    });
});
