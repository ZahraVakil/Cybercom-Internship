 // Check if items are already in local storage, if not, add some sample data
 function bakeryProducts(){
    const sampleProduct = [
        { id: 1, name: 'Cake', price: 600, quantity: 0, image: './images/cake.jpg' },
        { id: 2, name: 'Cupcakes', price: 40, quantity: 0, image: './images/cupcake.jpg' },
        { id: 3, name: 'Brownies', price: 55, quantity: 0, image: './images/brownie.jpg' }
    ];
    localStorage.setItem('products', JSON.stringify(sampleProduct));
    return sampleProduct;
}


function getItems() {
    const sampleProducts = localStorage.getItem("products");
    const products = sampleProducts ? JSON.parse(sampleProducts) : bakeryProducts();
    return products;
}

function renderList() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 

    // Retrieve products from local storage
    const products = getItems();

    // Loop through products and create list elements
    products.forEach(product => {
        const row = document.createElement('div');
        row.className = 'row border-top border-bottom main align-items-center';

        row.innerHTML = `
            <div class="col-2"><img class="img-fluid" src="${product.image}"></div>
            <div class="col">
                <div class="row">${product.name}</div>
                <div class="row text-muted">₹${product.price}</div>
            </div>
            <div class="col">
                <a href="#" onclick="decrementQuantity(${product.id})">-</a>
                <span id="${product.id}Quantity" class="border">${product.quantity}</span>
                <a href="#" onclick="incrementQuantity(${product.id})">+</a>
            </div>
        `;

        cartContainer.appendChild(row);
    });
}

function incrementQuantity(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex].quantity++;
        localStorage.setItem('products', JSON.stringify(products));
        renderList(); // Update the displayed list
    }
}

function decrementQuantity(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1 && products[productIndex].quantity > 0) {
        products[productIndex].quantity--;
        localStorage.setItem('products', JSON.stringify(products));
        renderList(); 
    }
}

// Initial rendering of the list
renderList();