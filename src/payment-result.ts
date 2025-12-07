/**
 * Payment Result Page
 * Displays the outcome of the payment transaction
 */

import { getCart } from './utils/cartHelpers.js';

interface PaymentResultData {
    success: boolean;
    transactionId: string;
    message: string;
    provider: string;
    amount: number;
}

document.addEventListener('DOMContentLoaded', () => {
    // Get result data from sessionStorage
    const resultDataStr = sessionStorage.getItem('paymentResult');
    
    if (!resultDataStr) {
        // No result data, redirect to checkout
        window.location.href = 'checkout.html';
        return;
    }

    const resultData: PaymentResultData = JSON.parse(resultDataStr);
    
    // Clear the stored result
    sessionStorage.removeItem('paymentResult');

    // Update cart badge
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        const cart = getCart();
        cartBadge.textContent = cart.length.toString();
        cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }

    // Get DOM elements
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const transactionId = document.getElementById('transaction-id');
    const paymentProvider = document.getElementById('payment-provider');
    const paymentAmount = document.getElementById('payment-amount');
    const retryLink = document.getElementById('retry-link') as HTMLAnchorElement;

    if (!resultIcon || !resultTitle || !resultMessage || !transactionId || !paymentProvider || !paymentAmount) {
        return;
    }

    // Display result based on success/failure
    if (resultData.success) {
        // Success state
        resultIcon.innerHTML = '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--success-color)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>';
        resultTitle.textContent = 'Payment Successful!';
        resultTitle.style.color = 'var(--success-color)';
        resultMessage.textContent = resultData.message;
        
        // Hide retry button on success
        if (retryLink) {
            retryLink.style.display = 'none';
        }
    } else {
        // Failure state
        resultIcon.innerHTML = '<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>';
        resultTitle.textContent = 'Payment Failed';
        resultTitle.style.color = 'var(--error-color)';
        resultMessage.textContent = resultData.message;
    }

    // Display transaction details
    transactionId.textContent = resultData.transactionId;
    paymentProvider.textContent = resultData.provider;
    paymentAmount.textContent = `€${resultData.amount.toFixed(2)}`;
});
