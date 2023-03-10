// Get references to the html elements
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const bookResultsEl = document.getElementById("book-results");
let searchList = [];

// Open Library API endpoint (added an 's' to the http to make it more secure).
const openLibraryUrl = "https://openlibrary.org/search.json?q=";

// This code adds an event listener to the search button
searchButton.addEventListener("click", searchForBooks);

// This function gets the search term from the input field
function getSearchTerm() {
  return searchInput.value;
}

// This function clears the previous search results
function clearSearchResults() {
  bookResultsEl.innerHTML = "";
}

// This function creates a message and displays it in the search results
function displayMessage(messageText) {
  const message = document.createElement("div");
  message.textContent = messageText;
  bookResultsEl.appendChild(message);
}

// This function fetches data from the Open Library API using the search term or logs an error if an error is generated.
function fetchBookData(searchTerm) {
  const openLibraryUrl = "https://openlibrary.org/search.json?q=";
  return fetch(`${openLibraryUrl}${searchTerm}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw new Error("An error occurred while fetching data.");
    });
}

// This function creates HTML elements for each book in the search results and displays them to the HTML
function displaySearchResults(searchResults) {
  let resultsCount = 0;
  searchResults.docs.forEach((book) => {
    if (resultsCount >= 5) {
      return;
    }
    const result = document.createElement("div");
    result.classList.add("result");
    const cardTemplate = `
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
                  <p class="title is-4">${
                    book.title ? book.title : "Unknown"
                  }</p>
                  <p class="subtitle is-6">${
                    book.author_name ? book.author_name.join(", ") : "Unknown"
                  }</p>
              </div>
          </div>
      `;
    result.addEventListener("click", () => {
      console.log("it worked");
    });
    result.innerHTML = cardTemplate;
    bookResultsEl.appendChild(result);
    resultsCount++;
  });
}

// This function executes the book search and displays the results to the HTML
function searchForBooks() {
  console.log("SearchForBooks function is running");
  const searchTerm = getSearchTerm();

  if (searchTerm === "") {
    displayMessage("Please enter a search term.");
    return;
  }

  clearSearchResults();

  fetchBookData(searchTerm)
    .then(function (data) {
      if (data.docs.length === 0) {
        displayMessage("No results found.");
        return;
      }

      displaySearchResults(data);
    })
    .catch((error) => {
      displayMessage(error.message);
    });
}

function displaySearchHistory() {
  console.log("displaySearchHistory", searchHistory);
  const searchHistoryEl = document.getElementById("search-history");
  searchHistoryEl.innerHTML = "";
  searchHistory.forEach((searchTerm) => {
    const searchItem = document.createElement("li");
    searchItem.textContent = searchTerm;
    console.log("searchItem", searchItem);
    searchItem.addEventListener("click", () => {
      searchInput.value = searchTerm;
      searchButton.click();
      console.log("displaySearchHistory click");
    });
    searchHistoryEl.appendChild(searchItem);
  });
}

var searchHistory = [];
const storeSearchHistory = localStorage.getItem("searchHistory");
if (storeSearchHistory) {
  searchHistory = JSON.parse(storeSearchHistory);
}
console.log(searchHistory);
displaySearchHistory();

function storeSearchTerm() {
  searchList.push(searchTerm);
  localStorage.setItem("searchHistory", searchList);
}
