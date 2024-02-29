document.addEventListener("DOMContentLoaded", function() {
    const editProductForm = document.getElementById('editProductForm');
    //get id parameter from url
    const productId = new URLSearchParams(window.location.search).get('id');

    // Fetch product data based on the product ID got from url 
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch product data.');
            }
        })
        .then(product => {
            // Bind product data
            document.getElementById('title').value = product.title;
            document.getElementById('imageUrl').value = product.images[0].slice(2, -2);
            document.getElementById('price').value = product.price;
            document.getElementById('description').value = product.description;
            document.getElementById('category').value = product.category.name;
            document.getElementById('category').disabled = true; 
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            alert('Error fetching product data. Please try again.');
        });

    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const title = document.getElementById('title').value.trim();
            const imageUrl = document.getElementById('imageUrl').value.trim();
            const price = document.getElementById('price').value.trim();
            const description = document.getElementById('description').value.trim();

            const updatedProduct = {
                title: title,
                images: [imageUrl],
                price: parseFloat(price),
                description: description
            };

            // update product
            fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            })
            .then(response => {
                if (response.ok) {
                    alert('Product updated successfully.');
                    editProductForm.reset(); 
                } else {
                    throw new Error('Failed to update product.');
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                alert('Error updating product. Please try again.');
            });
        }
    });

    function validateForm() {
        const title = document.getElementById('title').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();
        const price = document.getElementById('price').value.trim();
        const description = document.getElementById('description').value.trim();

        if (title === '' || imageUrl === '' || price === '' || description === '') {
            alert('Please fill in all fields.');
            return false;
        }

        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            alert('Please enter a valid price.');
            return false;
        }

        return true;
    }
});
