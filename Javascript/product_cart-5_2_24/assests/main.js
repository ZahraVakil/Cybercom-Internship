 // Check if items are already in local storage, if not, add some sample data
 function bakeryProducts(){
    const sampleProduct = [
        { id: 1, name: 'Cake', price: 600, quantity: 0, image: '../assests/images/cake.jpg' },
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

            <div class="col-2"><img class="img-fluid" src="./assests/${product.image}"></div>
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
        renderList(); 
        renderGrandTotal();
    }
}

function decrementQuantity(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1 && products[productIndex].quantity > 0) {
        products[productIndex].quantity--;
        localStorage.setItem('products', JSON.stringify(products));
        renderList(); 
        renderGrandTotal();
    }
}

function calculateGrandTotal() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let grandTotal = 0;

    products.forEach(product => {
        grandTotal += product.quantity * product.price;
    });

    console.log(grandTotal);
    return grandTotal;
}

function renderGrandTotal() {
    const grandTotalElement = document.getElementById('grandTotal');
    const total = calculateGrandTotal();

    grandTotalElement.textContent = `Grand Total: ₹${total}`;
}
// Initial rendering of the list
renderList();


function displayOrderHistory(){

    const orderHistoryUrl = './cartHistory.html'; 
    window.location.href = orderHistoryUrl;
        
    const totalProducts= document.getElementById('totalProducts');
    totalProducts.innerHTML = ''; 
    console.log("hello");
    const orderProducts = getItems();
    console.log(orderProducts);

    orderProducts.forEach(order => {
        const row = document.createElement('div');
        row.className = 'row border-top border-bottom main align-items-center';

        row.innerHTML = `
            <div class="col">
                <div class="row">${order.name}</div>
                <div class="row">Qty: ${order.quantity}</div>
                <div class="row text-muted">Price: ${order.price * order.quantity}</div>
            </div>
            
        `;

        totalProducts.appendChild(row);
    })
}