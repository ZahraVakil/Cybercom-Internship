document.addEventListener("DOMContentLoaded", function() {
    renderQuotesFromLocalStorage();
  });
  
  function renderQuotesFromLocalStorage() {
    const quoteList = document.getElementById('quoteList');
    quoteList.innerHTML = '';
  
    let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
  
    favoriteQuotes.forEach((quote, index) => {
      const quoteCard = document.createElement('div');
      quoteCard.classList.add('quote-card');
  
      const quoteContent = document.createElement('p');
      quoteContent.classList.add('quote-content');
      quoteContent.textContent = `"${quote.content}"`;
  
      const quoteAuthor = document.createElement('p');
      quoteAuthor.classList.add('quote-author');
      quoteAuthor.textContent = `- ${quote.author}`;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteQuote(index));
  
      quoteCard.appendChild(quoteContent);
      quoteCard.appendChild(quoteAuthor);
      quoteCard.appendChild(deleteBtn);
  
      quoteList.appendChild(quoteCard);
    });
  }
  
  function deleteQuote(index) {
    let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];
    favoriteQuotes.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    renderQuotesFromLocalStorage();
  }
  