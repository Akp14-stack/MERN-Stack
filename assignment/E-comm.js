const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'electronics', image: 'laptop.jpg' },
    { id: 2, name: 'Smartphone', price: 599.99, category: 'electronics', image: 'smartphone.jpg' },
    { id: 3, name: 'T-shirt', price: 19.99, category: 'clothing', image: 'tshirt.jpg' },
    { id: 4, name: 'Jeans', price: 49.99, category: 'clothing', image: 'jeans.jpg' }
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function displayProducts(productsToDisplay) {
    const productCatalog = document.getElementById('productCatalog');
    productCatalog.innerHTML = '';
  
    productsToDisplay.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productCatalog.appendChild(productItem);
    });
  
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
      });
    });
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
  
    // Clear the current cart items
    cartItems.innerHTML = '';
    
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });
  
    totalPrice.textContent = total.toFixed(2);
  }
  
  function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
  
  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    const category = e.target.value;
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filteredProducts);
  });
  
  document.getElementById('clearCart').addEventListener('click', clearCart);
  
  // Initial setup
  displayProducts(products);
  updateCart();
  