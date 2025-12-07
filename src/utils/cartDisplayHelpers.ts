/**
 * Cart Display Helper Functions
 * Handles rendering cart items and totals
 */

import { getCart, getTotal } from './cartHelpers.js';

/**
 * Updates the cart display with current cart items
 */
export function updateCartDisplay(): void {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items-container');
    const emptyMessage = document.getElementById('empty-cart-message');
    const totalAmountElement = document.getElementById('total-amount');

    if (!cartContainer || !emptyMessage || !totalAmountElement) return;

    // Clear existing items
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        // Show empty message
        emptyMessage.classList.remove('hidden');
        totalAmountElement.textContent = '0.00';
        return;
    }

    // Hide empty message
    emptyMessage.classList.add('hidden');

    // Display each cart item
    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.className = 'item-image';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = product.name;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'item-price';
        priceSpan.textContent = `${product.price.toFixed(2)}€`;

        itemDiv.appendChild(img);
        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(priceSpan);

        cartContainer.appendChild(itemDiv);
    });

    // Update total
    const total = getTotal();
    totalAmountElement.textContent = total.toFixed(2);
}
