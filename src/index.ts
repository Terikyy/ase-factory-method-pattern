/**
 * Index Page - Product Listing and Cart Management
 */

import { addToCart, getCart } from './utils/cartHelpers.js';
import { Product } from './models/Product.js';

// Update cart badge counter
function updateCartBadge(): void {
    const cart = getCart();
    const cartBadge = document.getElementById('cart-count');
    
    if (cartBadge) {
        if (cart.length > 0) {
            cartBadge.textContent = cart.length.toString();
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge on page load
    updateCartBadge();

    // Get all "Add to Cart" buttons
    const addButtons = document.querySelectorAll('.add-to-cart-btn');

    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            const productCard = target.closest('.product-card') as HTMLElement;

            if (productCard) {
                // Extract product data from data attributes
                const id = parseInt(productCard.dataset.productId || '0');
                const name = productCard.dataset.productName || '';
                const price = parseFloat(productCard.dataset.productPrice || '0');
                const image = productCard.dataset.productImage || '';

                const product: Product = { id, name, price, image };

                // Add to cart
                const wasAdded = addToCart(product);

                // Update badge
                updateCartBadge();

                // Visual feedback
                if (wasAdded) {
                    target.textContent = 'Added!';
                    target.style.background = 'var(--success-color)';
                    
                    setTimeout(() => {
                        target.textContent = 'Add to Cart';
                        target.style.background = 'var(--accent-primary)';
                    }, 1000);
                } else {
                    target.textContent = 'Already in cart';
                    target.style.background = 'var(--error-color)';
                    
                    setTimeout(() => {
                        target.textContent = 'Add to Cart';
                        target.style.background = 'var(--accent-primary)';
                    }, 1500);
                }
            }
        });
    });
});
