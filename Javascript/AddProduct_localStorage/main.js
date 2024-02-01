function addProduct() {
    // Get values from the form
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = document.getElementById("productCategory").value;

    // Create a product object
    const product = {
        name: productName,
        category: productCategory,
        price: productPrice,
       
    };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product  products array
    existingProducts.push(product);

    // local storage
    localStorage.setItem("products", JSON.stringify(existingProducts));

    displayProducts(existingProducts);
}