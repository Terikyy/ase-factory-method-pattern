/**
 * Cart Helper Functions
 * Simple localStorage-based shopping cart operations
 */

import { Product } from '../models/Product';

const CART_KEY = 'cart';

/**
 * Adds a product to the shopping cart
 * @param product - The product to add to the cart
 * @returns true if product was added, false if it already exists
 */
export function addToCart(product: Product): boolean {
    const cart = getCart();
    
    // Check if product already exists in cart
    const exists = cart.some(item => item.id === product.id);
    
    if (!exists) {
        cart.push(product);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        return true;
    }
    
    return false;
}

/**
 * Retrieves all products from the shopping cart
 * @returns Array of products in the cart
 */
export function getCart(): Product[] {
    const cartData = localStorage.getItem(CART_KEY);
    
    if (!cartData) {
        return [];
    }
    
    try {
        return JSON.parse(cartData) as Product[];
    } catch {
        return [];
    }
}

/**
 * Calculates the total price of all products in the cart
 * @returns Total price of all cart items
 */
export function getTotal(): number {
    const cart = getCart();
    return cart.reduce((total, product) => total + product.price, 0);
}

/**
 * Clears all products from the shopping cart
 */
export function clearCart(): void {
    localStorage.removeItem(CART_KEY);
}
