window.onload = function() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    displayProducts(products);
};

function displayProducts(products) {
    const tableBody = document.getElementById("productList");

    tableBody.innerHTML = "";

    products.forEach(function(product, index) {
        const row = tableBody.insertRow();

        const nameCell = row.insertCell(0);
        const categoryCell = row.insertCell(1);
        const priceCell = row.insertCell(2);
        const actionsCell = row.insertCell(3);

        nameCell.innerHTML = product.name;
        priceCell.innerHTML = product.price;
        categoryCell.innerHTML = product.category;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.style.backgroundColor = "green"
        editButton.style.marginRight ="3px";
        editButton.style.padding = "3px";
        editButton.style.borderRadius= "2px"
        editButton.style.color ="white";
        editButton.addEventListener("click", function() {
            editProduct(index);
        });

        const deleteButton = document.createElement("button");
        deleteButton.style.backgroundColor = "red"
        deleteButton.style.marginRight ="3px";
        deleteButton.style.padding = "3px";
        deleteButton.style.borderRadius= "2px"
        deleteButton.style.color ="white";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteProduct(index);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}


    function editProduct(index) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
    
        // index is valid or not
        if (index >= 0 && index < products.length) {
            const productToEdit = products[index];
    
            // Store data at session storage for temporilary
            sessionStorage.setItem("editProduct", JSON.stringify(productToEdit));
    
            // Redirect to index.html
            window.location.href = "index.html";
        } else {
            //error message
            console.error("Invalid index for editing product.");
        }
    }


function deleteProduct(index) {
    
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.splice(index, 1);
    //save again product list
    localStorage.setItem("products", JSON.stringify(products));
    // reload the table
    displayProducts(products);
}