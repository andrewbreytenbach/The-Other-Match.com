// Get references to the html elements
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const bookResultsEl = document.getElementById("book-results");
let searchList = [];

/* EVENT LISTENERS---------------------------------------------------------
 */
$("#search-button").click(searchForBooks);
$("#previous-searches").on("click", ".search-term", getPreviousSearch);
$("#book-results").on("click", ".result", getMovieResults);

/* MOVIE API---------------------------------------------------------------
 */
function getMovieResults() {
  console.log("getMovieResults function has run");
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
  const openLibraryUrl = `https://openlibrary.org/search.json?q=${searchTerm}`;
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
function displaySearchResults(searchResults) {
  bookResultsEl.innerHTML = "";
  const books = searchResults.docs;
  for (let i = 0; i < books.length; i++) {
    if (i < 5) {
      createBookCard(books[i]);
    }
  }
}

// Create HTML element for a single book result and append to #book-results in HTML
function createBookCard(book) {
  const bookCard = `
  <div class="result">
    <div class="card">
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
            <p class="title is-4">${book.title ? book.title : "Unknown"}</p>
            <p class="subtitle is-6">${
              book.author_name ? book.author_name.join(", ") : "Unknown"
            }</p>
        </div>
    </div>
  </div>
  `;
  $("#book-results").append(bookCard);
}

// This function creates a message and displays it in the search results
function displayMessage(messageText) {
  const message = document.createElement("div");
  message.textContent = messageText;
  bookResultsEl.appendChild(message);
}

// Execute the book search and displays the results to the HTML
function searchForBooks() {
  const searchTerm = searchInput.value;

  if (searchTerm === "") {
    displayMessage("Please enter a search term.");
    return;
  } else {
    fetchBookData(searchTerm)
      .then(function (data) {
        if (data.docs.length === 0) {
          displayMessage("No results found.");
        } else {
          displaySearchResults(data);
          storeSearchTerm(searchTerm);
        }
      })
      .catch((error) => {
        displayMessage(error.message);
      });
  }
}
