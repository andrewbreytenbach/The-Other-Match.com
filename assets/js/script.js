/* EVENT LISTENERS---------------------------------------------------------
 */
$("#search-button").click(searchForBooks);
$("#previous-searches").on("click", ".search-term", getPreviousSearch);
$("#book-results").on("click", ".book-result", searchForMovies);

/* MOVIE API---------------------------------------------------------------
 */
// Fetch data from TMDB API using the title of the selected book
const tmdbApiKey = `e7f5fe706f136f8b165baa6ae5a2f4aa`;

function fetchMovieResults(bookTitle) {
  const tmdbSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&query=${bookTitle}&page=1&include_adult=false`;

  return fetch(tmdbSearchUrl)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error("An error occurred while fetching data.");
    });
}

const movieYear = function (movie) {
  let array = movie.release_date.split("-");
  return array[0];
};

function createMovieCard(movie) {
  let movieCard = $("<div>");
  movieCard.addClass("card movie-result");
  movieCard.html(`
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                  movie.poster_path
                }" alt="movie cover image">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-4">${movie.original_title} (${movieYear(
    movie
  )})</p>
            <p class="subtitle is-6">${""}</p>
        </div>
  `);
  $("#movie-results").append(movieCard);
}

function searchForMovies() {
  $("#movie-results").html("");
  const bookTitle = $(this).data("metadata").title;
  const bookYear = $(this).data("metadata").year;

  fetchMovieResults(bookTitle).then(function (data) {
    if (data.results.length < 1) {
      var message = document.createElement("div");
      message.textContent = "No results found.";
      $("#movie-results").append(message);
      return;
    } else {
      let exactMatch = data.results.filter(function (result) {
        return result.title == bookTitle && movieYear(result) > bookYear;
      });
      if (exactMatch.length > 0) {
        exactMatch.forEach((movie) => {
          createMovieCard(movie);
        });
      } else {
        for (let i = 0; i < data.results.length; i++) {
          if (i < 5) {
            createMovieCard(data.results[i]);
          }
        }
      }
    }
  });
}

/* SEARCH HISTORY-----------------------------------------------------
 */

// creates array searchHistory from local storage; if value from local storage is null, array stays empty
const storedValues = localStorage.getItem("searchHistory");
let searchHistory = [];
if (storedValues !== null) {
  searchHistory = JSON.parse(storedValues);
}

// create Previous Searches HTML Elements using searchHistory array
function createSearchList(array) {
  $("#previous-searches").empty();
  $("#previous-searches").append(
    `<span>Previous Searches:</span>`,
    `<ul id="search-history"></ul>`
  );
  for (let i = 0; i < array.length; i++) {
    if (i < 5) {
      $("#search-history").append(`<li class="search-term">${array[i]}</li>`);
    }
  }
}

// add a new term to front of searchHistory array and update local storage
function storeSearchTerm(searchTerm) {
  searchHistory.unshift(searchTerm);
  searchHistory = removeArrayDuplicates(searchHistory);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

// Check incoming array for duplicates and only adds them back to outgoing array if value is unique
function removeArrayDuplicates(array) {
  let uniqueArray = [];
  for (i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
}

// on page load, if searchHistory has values, run createSearchList
if (searchHistory.length > 0) {
  createSearchList(searchHistory);
}

// Load a previous search
function getPreviousSearch(previousSearch) {
  $("#search-bar").val(previousSearch.target.innerHTML);
  $("#search-button").click();
}

/* OPEN LIBRARY API & BOOK SEARCH----------------------------------------------------
 */

// Fetch data from the Open Library API using the search term or logs an error if an error is generated
function fetchBookData(searchTerm) {
  const openLibraryUrl = `https://openlibrary.org/search.json?title=${searchTerm}`;
  return fetch(openLibraryUrl)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error("An error occurred while fetching data.");
    });
}

// Create book card for each result (up to 5)
function displayBookResults(searchResults) {
  $("#book-results").html("");
  $("#movie-results").html("");
  const books = searchResults.docs;
  let resultAuthors = [];

  for (let i = 0; i < books.length; i++) {
    if (
      $(".book-result").length < 5 &&
      books[i].readinglog_count > 100 &&
      !resultAuthors.includes(books[i].author_name[0])
    ) {
      resultAuthors.push(books[i].author_name[0]);
      console.log(resultAuthors);
      createBookCard(books[i]);
    }
  }
  if ($(".book-result").length === 1) {
    $(".book-result").click();
  }
}

// Create HTML element for a single book result and append to #book-results in HTML
function createBookCard(book) {
  console.log(book);
  let bookCard = $("<div>");
  bookCard.addClass("card book-result");
  bookCard.data("metadata", {
    title: `${book.title}`,
    year: `${book.first_publish_year}`,
    author: `${book.author_name}`,
  });
  bookCard.html(`
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${
                  book.cover_i
                    ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150"
                }" alt="Book cover image">
            </figure>
        </div>
        <div class="card-content">
            <p class="title is-4">${book.title ? book.title : "Unknown"} (${
    book.first_publish_year
  })</p>
            <p class="subtitle is-6">${
              book.author_name ? book.author_name.join(", ") : "Unknown"
            }</p>
        </div>
  `);
  $("#book-results").append(bookCard);
}

// This function creates a message and displays it in the search results
function displayMessage(messageText) {
  const message = document.createElement("div");
  message.textContent = messageText;
  $("#book-results").append(message);
}

// Execute the book search and displays the results to the HTML
function searchForBooks() {
  const searchTerm = $("#search-bar").val();

  if (searchTerm === "") {
    displayMessage("Please enter a search term.");
    return;
  } else {
    fetchBookData(searchTerm)
      .then(function (data) {
        if (data.docs.length === 0) {
          displayMessage("No results found.");
        } else {
          displayBookResults(data);
          storeSearchTerm(searchTerm);
        }
      })
      .catch((error) => {
        displayMessage(error.message);
      });
  }
}
