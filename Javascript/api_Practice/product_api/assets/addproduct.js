let url = "https://api.escuelajs.co/api/v1";
// Fetch categories from API and populate the dropdown
fetch(url + "/categories") 
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    const categoryDropdown = document.getElementById("category");
    data.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      categoryDropdown.appendChild(option);
    });
  })
  .catch((error) => console.error("Error fetching categories:", error));


  document.addEventListener("DOMContentLoaded", function() {
    const addProductForm = document.getElementById('addProductForm');

    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const title = document.getElementById('title').value.trim();
            const imageUrl = document.getElementById('imageUrl').value.trim();
            const price = document.getElementById('price').value.trim();
            const description = document.getElementById('description').value.trim();
            const categoryId = document.getElementById('category').value;

            const newProduct = {
                title: title,
                images: [imageUrl], 
                price: parseFloat(price),
                description: description,
                categoryId: categoryId
            };

            fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => {
                if (response.ok) {
                    alert('Product added successfully.');
                    addProductForm.reset(); 
                } else {
                    console.error('Error adding product:', response.status);
                    alert('Error adding product. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error adding product:', error);
                alert('Error adding product. Please try again.');
            });
        }
    });

    function validateForm() {
        const title = document.getElementById('title').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();
        const price = document.getElementById('price').value.trim();
        const description = document.getElementById('description').value.trim();
        const categoryId = document.getElementById('category').value;

        if (title === '' || imageUrl === '' || price === '' || description === '' || categoryId === '') {
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
