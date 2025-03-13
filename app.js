document.getElementById("searchButton").addEventListener("click", function() {
    const query = document.getElementById("searchQuery").value;
    
    if (query) {
        fetchBooks(query);
    } else {
        alert("Please enter a search query!");
    }
});

function fetchBooks(query) {
    const apiKey = 'AIzaSyCulCINgXxtiSXQtjc-4z4o675AEyXU9KQ';  // Replace with your API key
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.items);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayBooks(books) {
    const bookResults = document.getElementById("bookResults");
    bookResults.innerHTML = '';  // Clear previous results

    if (books) {
        books.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book-item");

            const title = book.volumeInfo.title;
            const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';

            bookDiv.innerHTML = `
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p>${author}</p>
            `;

            bookResults.appendChild(bookDiv);
        });
    } else {
        bookResults.innerHTML = '<p>No books found. Try a different search.</p>';
    }
}
