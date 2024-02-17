document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector('.products');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    // Sample product data (replace with your actual product data)
    const products = [
        { name: 'Product 1', image: 'product1.jpg', price: 10.00, rating: 4 },
        { name: 'Product 2', image: 'product2.jpg', price: 20.00, rating: 5 },
        // Add more product data as needed
    ];

    // Function to generate product cards
    function generateProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product');

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <p>Rating: ${product.rating}</p>
            <div class="quantity">
                <button class="decrement">-</button>
                <input type="text" class="quantity-input" value="0" readonly>
                <button class="increment">+</button>
            </div>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Add event listeners for increment and decrement buttons
        const decrementBtn = productCard.querySelector('.decrement');
        const incrementBtn = productCard.querySelector('.increment');
        const quantityInput = productCard.querySelector('.quantity-input');

        decrementBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                quantityInput.value = --quantity;
            }
        });

        incrementBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = ++quantity;
        });

        // Add event listener for Add to Cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            if (quantity > 0) {
                const totalPrice = product.price * quantity;
                const item = document.createElement('li');
                item.textContent = `${product.name} x ${quantity} - $${totalPrice.toFixed(2)}`;
                cartItems.appendChild(item);
                total += totalPrice;
                cartTotal.textContent = total.toFixed(2);
                quantityInput.value = 0; // Reset quantity input
            } else {
                alert("Please select a quantity greater than 0.");
            }
        });

        return productCard;
    }

    // Function to filter products based on search input
    function filterProducts(searchTerm) {
        productsContainer.innerHTML = ''; // Clear existing products
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        filteredProducts.forEach(product => {
            const productCard = generateProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }

    // Initial product card generation
    products.forEach(product => {
        const productCard = generateProductCard(product);
        productsContainer.appendChild(productCard);
    });

    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        filterProducts(searchTerm);
    });

    // Event listener for search input (to trigger search on Enter keypress)
    searchInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            filterProducts(searchTerm);
        }
    });
});
