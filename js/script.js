const cartIcon = document.querySelector('#cart_icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart_close');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

const addCartButton = document.querySelectorAll('.add_cart');
addCartButton.forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.product_box');
        addToCart(productBox);
    });
});


const cartContent = document.querySelector('.cart_content');
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector('img').src;
    const productTitle = productBox.querySelector('.product_title').textContent;
    const productPrice = productBox.querySelector('.price').textContent;

    const cartItems = cartContent.querySelectorAll('.cart_product_title');
    for (let item of cartItems){
        if (item.textContent === productTitle){
            alert('This item is already in the cart.');
            return;   
        }
    }

    const cartBox = document.createElement('div');
    cartBox.classList.add('cart_box');
    cartBox.innerHTML = `
                <img src="${productImgSrc}" class="cart_img" alt="">
                <div class="cart_detail">
                    <h2 class="cart_product_title">${productTitle}</h2>
                    <span class="cart_price">${productPrice}</span>
                    <div class="cart_quantity">
                        <button id="decreement">-</button>
                        <span class="number">1</span>
                        <button id="increement">+</button>
                    </div>
                </div>
                <i class="fa fa-trash cart_remove" aria-hidden="true"></i>
    `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector('.cart_remove').addEventListener('click', () => {
        cartBox.remove();

        updateCount(-1);

        updateTotlaPrice();
    });
    cartBox.querySelector('.cart_quantity').addEventListener('click', event => {
        const numberElement = cartBox.querySelector('.number');
        const decreementButton = cartBox.querySelector('#decreement');
        let quantity = numberElement.textContent;

        if (event.target.id === 'decreement' && quantity > 1){
            quantity--;
            if (quantity === 1){
                decreementButton.style.color = '#999';
            }
        }else if (event.target.id === 'increement'){
            quantity++;
            decreementButton.style.color = '#333';
        }
        numberElement.textContent = quantity;
        updateTotlaPrice();
    });

    updateCount(1);

    updateTotlaPrice();
};

const updateTotlaPrice = () => {
    const totalPriceElement = document.querySelector('.total_price');
    const cartBoxes = document.querySelectorAll('.cart_box');
    let total = 0;
    
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector('.cart_price');
        const quantityElement = cartBox.querySelector('.number');
        const price = priceElement.textContent.replace('$', '');
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCount = change => {
    const cartItemCountBadge = document.querySelector('.cart_item_count');
    cartItemCount += change;

    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = 'visible';
        cartItemCountBadge.textContent = cartItemCount;
    }else{
        cartItemCountBadge.style.visibility = 'hidden';
        cartItemCountBadge.textContent = '';
    }
};

const buyNowButton = document.querySelector('.btn_buy');
buyNowButton.addEventListener('click', () => {
    const cartBoxes = cartContent.querySelectorAll('.cart_box');
    if (cartBoxes.length === 0) {
        alert('Your cart is empty. Please add item to your cart before buying.');
        return;
    }
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;

    updateCount(0);

    updateTotlaPrice();

    alert('Thank you for your purchase!!.')

});