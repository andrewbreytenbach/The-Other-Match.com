// Open Library API endpoint.
const openLibraryUrl = 'http://openlibrary.org/search.json?q=';

// Fetch data from Open Library API.
fetch(openLibraryUrl)
    .then( function(response) {  return response.json()})
   
    // This checks to see if the book even exists in the api and then either returns a message or proceeds with the function.
    .then( function(data) {
        if (data.docs.length === 0) {
            var message = document.createElement('div');
            message.textContent = "No results found.";
            resultsContainer.appendChild(message);
            return;
        }

        // This goes through each book in the search and if the search matches, it displays the book title on the html.
        data.docs.forEach(book => {
            const result = document.createElement('div');
            result.classList.add('result');

            const title = document.createElement('h3');
            title.textContent = book.title;
            result.appendChild(title);

            resultsContainer.appendChild(result);
        });
    })