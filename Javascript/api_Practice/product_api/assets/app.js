document.addEventListener("DOMContentLoaded", function () {
    let apiData = []; 
    let originalData = [];
    const URL = "https://api.escuelajs.co/api/v1/products"
    const spinner = document.getElementById('spinner'); 
    const sortSelect = document.getElementById('sort');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const productContainer = document.getElementById('product-container');
 

    const paginationContainer = document.querySelector('.paginationContainer');
    const productsPerPage = 10; // Number of products to display per page
    let currentPage = 1; 
    spinner.style.display = 'block';
    
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            apiData = data
            originalData = [...data];
            console.log(JSON.stringify(apiData))
            // initial render
            renderProducts(data);
            renderPagination();
            spinner.style.display = 'none';
        })
        .catch(error => console.error('Error fetching products:', error));

    //render product list
    function renderProducts(data) {
        productContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToRender = data.slice(startIndex, endIndex);
        productsToRender.forEach(product => {
            const card = createProductCard(product);
            productContainer.appendChild(card);
        });
    }

    //SORTING PRODUCT
    sortSelect.addEventListener('change', function () {
        const sortBy = sortSelect.value;
        if (sortBy === 'low') {
            sortProductsByPriceAsc();
        } else if (sortBy === 'high') {
            sortProductsByPriceDesc();
        } else if (sortBy === 'default') {
            renderProducts(originalData);
        }
     });

    // SORT (low to high)
    function sortProductsByPriceAsc() {
        // const sortedProducts = [...apiData].sort((a, b) => a.price - b.price);
        // renderProducts(sortedProducts);
        apiData.sort((a, b) => a.price - b.price);
        renderProducts(apiData);
    }

    // SORT (high to low)
    function sortProductsByPriceDesc() {
        // const sortedProducts = [...apiData].sort((a, b) => b.price - a.price);
        // renderProducts(sortedProducts);
        apiData.sort((a, b) => b.price - a.price);
        renderProducts(apiData);
    
    }

    //SEARCHING & FILTERING
    searchButton.addEventListener('click', function () {
        const category = searchInput.value.trim();
        if (category !== '') {
            fetchProductsByCategory(category);
        } else {
            alert('Please enter a category to search.');
        }
    });

    
    async function fetchProductsByCategory(category) {
        spinner.style.display = 'block';
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            const filteredProducts = data.filter(product => product.category.name.toLowerCase().includes(category.toLowerCase()));
            renderProducts(filteredProducts);
            spinner.style.display = 'none';
        } catch (error) {
            console.error('Error fetching products by category:', error);
            spinner.style.display = 'none';
        }
    }

    
    //PRODUCT CARD
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-product-id', product.id);

        const imgTitleColumn = document.createElement('div');
        imgTitleColumn.classList.add('info');
        card.appendChild(imgTitleColumn);

        const images = product.images.map(url => url.slice(1, -1)); 
        const img = document.createElement('img');
        img.src = images[0];
        img.alt = product.title; 
        imgTitleColumn.appendChild(img);

       
        const category = document.createElement('p');
        category.textContent ="Category:" +  product.category.name;
        imgTitleColumn.appendChild(category);

        const price = document.createElement('p');
        price.textContent = 'Price: ₹ ' + product.price;
        imgTitleColumn.appendChild(price);

        
        const descriptionColumn = document.createElement('div');
        descriptionColumn.classList.add('description');
        card.appendChild(descriptionColumn);

        const title = document.createElement('h2');
        title.textContent = product.title;
        descriptionColumn.appendChild(title);

        const description = document.createElement('p');
        description.textContent = product.description;
        descriptionColumn.appendChild(description);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            window.location.href = `editProduct.html?id=${product.id}`;
        });
        descriptionColumn.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteProduct(product.id));
        descriptionColumn.appendChild(deleteButton);

        return card;
    }

    //DELETE PRODUCT

    function deleteProduct(productId) {
        const confirmation = confirm("Are you sure you want to delete this product?");
    
        if (confirmation) {
            fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    const cardToDelete = document.querySelector(`.card[data-product-id="${productId}"]`);

                    if (cardToDelete) {
                        cardToDelete.remove();
                    }
                    alert('Product deleted successfully.');
                } else {
                    console.error('Error deleting product:', response.status);
                    alert('Error deleting product. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Error deleting product. Please try again.');
            });
        } else {
            alert('Deletion cancelled.');
        }
    }
   
    
    function renderPagination() {
        paginationContainer.innerHTML = '';
    
        const totalPages = Math.ceil(apiData.length / productsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.classList.add('paginationButton')
            button.textContent = i;
            button.addEventListener('click', function () {
                currentPage = i; 
                renderProducts(apiData); // Render products for the selected page
                highlightSelectedPageButton()// Update current page when a pagination button is clicked
            }); 
            paginationContainer.appendChild(button);
        }
        highlightSelectedPageButton();
    }

    function highlightSelectedPageButton() {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        });
    }
});




