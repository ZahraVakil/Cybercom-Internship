function displayOrderHistory(){
     
          
    const orderProducts = JSON.parse(localStorage.getItem("products")) || [];
    console.log(orderProducts);
    const totalProducts= document.getElementById('totalProducts');
    totalProducts.innerHTML = ''; 
    
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

function calculateGrandTotal() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let grandTotal = 0;

    products.forEach(product => {
        grandTotal += product.quantity * product.price;
    });

    console.log(grandTotal);
    return grandTotal;
}

function productSummary(){
    let total = calculateGrandTotal();
    let gst = (total * 18) / 100;
    let amount = total + gst;

    let rs = document.getElementById('total');
    let gstRs = document.getElementById('gst');
    let amountRs = document.getElementById('amount');

    rs.innerHTML ="Total Price: " + total + "₹";
    gstRs.innerHTML ="Gst (18%): " + gst + "₹";
    amountRs.innerHTML ="Total Amount: " + amount+ "₹";


}
displayOrderHistory();
productSummary();