const buyNowButtons = document.querySelectorAll('.buy-now-button');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productTitle = product.querySelector('.product-title').textContent;
        const productPrice = product.querySelector('.product-price').textContent;
        const currencySymbol = productPrice.charAt(0);

        const cartItem = document.createElement('li');
        cartItem.textContent = `${productTitle} - ${productPrice}`;
        cartItems.appendChild(cartItem);

        const totalPrice = parseFloat(cartTotal.textContent.substring(1)) + parseFloat(productPrice.substring(1));
        cartTotal.textContent = `${currencySymbol}${totalPrice.toFixed(2)}`;
    });
});
