/**
 * Checkout Page - Payment Processing with Factory Method Pattern
 */

import { clearCart } from './utils/cartHelpers.js';
import { updateCartDisplay } from './utils/cartDisplayHelpers.js';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Display cart items
    updateCartDisplay();

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            clearCart();
            updateCartDisplay();
        });
    }

    // Payment method selector
    const paymentSelect = document.getElementById('payment-select') as HTMLSelectElement;
    const paymentBtn = document.getElementById('payment-btn') as HTMLButtonElement;

    if (paymentSelect && paymentBtn) {
        // Update button text when payment method changes
        paymentSelect.addEventListener('change', () => {
            paymentBtn.textContent = `Pay with ${paymentSelect.value}`;
        });

        // Handle payment button click
        paymentBtn.addEventListener('click', () => {
            const selectedMethod = paymentSelect.value;
            console.log(`Payment method selected: ${selectedMethod}`);
            
            // TODO: Factory Method Pattern implementation
            // This is where payment processing factories will be used
        });
    }
});
