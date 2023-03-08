// Get references to the html elements
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("results-container");
const movieContainer = document.getElementById("movie-container");

// TMDB API Key & Endpoint
const tmdbApiKey = "e7f5fe706f136f8b165baa6ae5a2f4aa";
const tmdbUrl = "https://api.themoviedb.org/3/search/movie?";

// Fetch data from TMDB API using the title of the selected book
// TODO fix the fetch url, currently using an example url but need to make it dynamic

function getMovieResults() {
  fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=e7f5fe706f136f8b165baa6ae5a2f4aa&language=en-US&query=Jdksdlisdsdsd&page=1&include_adult=false"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.results.length < 1) {
        var message = document.createElement("div");
        message.textContent = "No results found.";
        movieContainer.appendChild(message);
        return;
      }
    });
}

getMovieResults();

// Open Library API endpoint (added an 's' to the http to make it more secure).
const openLibraryUrl = "https://openlibrary.org/search.json?q=";

// Added event listener to search button
searchButton.addEventListener("click", () => {
  // Get search term from the input value and store it as a variable
  const searchTerm = searchInput.value;

  // Clear previous results so the html has no results displaying
  resultsContainer.innerHTML = "";

  // Check if search term is empty (make sure the user actually searched for something)
  if (searchTerm === "") {
    const message = document.createElement("div");
    message.textContent = "Please enter a search term.";
    resultsContainer.appendChild(message);
    return;
  }

  // Fetch data from Open Library API using the search item variable.
  fetch(`${openLibraryUrl}${searchTerm}`)
    .then(function (response) {
      return response.json();
    })

    // This checks to see if the book even exists in the api and then either returns a message or proceeds with the function.
    .then(function (data) {
      if (data.docs.length === 0) {
        var message = document.createElement("div");
        message.textContent = "No results found.";
        resultsContainer.appendChild(message);
        return;
      }

      // This goes through each book in the search and if the search matches, it displays the following to the html:
      data.docs.forEach((book) => {
        const result = document.createElement("div");
        result.classList.add("result");

        // This displays the book title to the html
        const title = document.createElement("h3");
        title.textContent = book.title;
        result.appendChild(title);

        // This displays the year the book was published to the html
        const year = document.createElement("p");
        if (book.first_publish_year) {
          year.textContent = `Year: ${book.first_publish_year}`; // add the year if available
        } else {
          year.textContent = "Year: Unknown"; // if year is not available, display 'Unknown'
        }
        result.appendChild(year);

        // This displays the book author to the html
        const author = document.createElement("p");
        author.textContent = `by ${
          book.author_name ? book.author_name.join(", ") : "Unknown"
        }`;
        result.appendChild(author);

        // This displays the book cover image to the html
        const cover = document.createElement("img");
        cover.src = `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        result.appendChild(cover);

        resultsContainer.appendChild(result);
      });
    })

    // This logs an error message if something went wrong and displays it to the html
    .catch((error) => {
      console.error(error);
      const message = document.createElement("div");
      message.textContent = "An error occurred while fetching data.";
      resultsContainer.appendChild(message);
    });
});
