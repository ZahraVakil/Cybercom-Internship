const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const spinner = document.getElementById('spinner');
const pagination = document.getElementById('pagination');

let currentPage = 1;
const perPage = 6;

async function fetchRecipesByCuisine(cuisine) {
    spinner.style.display = 'block';
    recipeContainer.innerHTML = '';
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const filteredRecipes = data.recipes.filter(recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase());
      spinner.style.display = 'none';
      if (Array.isArray(filteredRecipes) && filteredRecipes.length > 0) {
        filteredRecipes.forEach(recipe => {
          const card = createRecipeCard(recipe);
          recipeContainer.appendChild(card);
        });
      } else {
        recipeContainer.innerHTML = '<p>No recipes found for this cuisine.</p>';
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      spinner.style.display = 'none';
    }
  }
  
  
  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
  
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('recipe-image');
    const img = document.createElement('img');
    img.src = recipe.image;
    imageContainer.appendChild(img);
    card.appendChild(imageContainer);
  
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('recipe-details');
  
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('recipe-info');
    infoContainer.innerHTML = `
      <p><strong>Category:</strong> ${recipe.cuisine}</p>
      <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
      <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
      <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
    `;
    imageContainer.appendChild(infoContainer);
  
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-ingredients');
    ingredientsContainer.innerHTML = `
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
      </ol>
    `;
    detailsContainer.appendChild(ingredientsContainer);
  
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('recipe-buttons');
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Update';
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    detailsContainer.appendChild(buttonsContainer);
  
    card.appendChild(detailsContainer);
  
    return card;
  }
  
searchButton.addEventListener('click', () => {
    const cuisine = searchInput.value.trim();
    if (cuisine !== '') {
      fetchRecipesByCuisine(cuisine);
    }
  });


