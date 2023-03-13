# Book-Movie Match (aka, the Other Match.com)

## About The Project

This code defines a web application that enables users to search for books and display their corresponding movie adaptations.

It uses jQuery to select and manipulate HTML elements, and also uses the Open Library API and The Movie Database (TMDB) API to fetch book and movie data. The code defines several event listeners, including one for the search button click, which executes the searchForBooks function. This function fetches data from the Open Library API using the search term entered by the user, and then creates book cards for up to 5 books based on the search results.

The code also defines a function for creating a movie card for each corresponding movie adaptation of the selected book. This function uses the book title to fetch data from the TMDB API and then creates movie cards for up to 5 movies based on the search results.

Additionally, the code includes functions for creating a search history and storing search terms in local storage. When a previous search is clicked, the getPreviousSearch function loads the search term and calls the searchForBooks function.

Overall, this code enables users to search for books and view their corresponding movie adaptations, as well as view their search history.

### Built With

* HTML 
* CSS
* Bulma
* Bootstrap
* jQuery
* JavaScript
* APIs


## Getting Started

In order to acess this website, just visit the following webpage: [https://github.com/andrewbreytenbach/movie-book-match](https://github.com/andrewbreytenbach/movie-book-match)

To get a local copy up and running, simply view the index.html file, stle.css, or the script.js file and see how you can play around, copy, and edit the file for personal usage to see what APIs we used. You can also change the search features used or the way the webpage is designed.

## Usage

The first step in designing this project was to design a wireframe for it. This is what the original wireframe we designed for the website looked like:

![Wireframe](/assets/images/wireframe.jpg "Wireframe")

Once the user first acceses the wesbpage, the following image is what they will see: 

![Start Page](/assets/images/ "Start Page")

In order to search for a book to see if it has been turned into a movie, the user will navigate to the search bar and type the name of a book. From there, the OpenLibrary API will be fetched to see if the book even exists. If the book exists, then the user will see the following image in the search results:

![Book Search](/assets/images/ "Book Search")

If the book exists in the OpenLibrary API, then the JavaScript will check to see if the same title also exists in the TMDB API. If it does exists in that API, then this is what the user will see on the webpage:

![Movie Results](/assets/images/ "Movie Results")

If a user wishes to view their previous search history, they simply can click on the list item under the previous searches and the page will display that item's search results, as shown below:

![Previous Searches](/assets/images/ "Previous Searches")

## Branch Convention

Our branches correspond to the issue that we're working on and the author of the branch. For example, for a branch written by Eileen that's addressing the issue of showing the movie results, the branch would be:

```md
eileen_feature-book-results
```

The author's name comes first, followed by an underscore, and then the feature with a short, descriptive phrase connected by hyphens.
 
## License

This repo is distributed under an MIT license. Click the MIT file in the reposiotry to see what this entails.  

## Contact

* [https://github.com/andrewbreytenbach] (Andrew Breytenbach) 
* [https://github.com/eileenmh] (Eileen Harvey)
* [https://github.com/DLEllis07] (Damar Ellis)
* [https://github.com/graysont3] (Taja Grayson)
* [https://github.com/taylor-green] (Taylor Green)

Project Link: [https://andrewbreytenbach.github.io/movie-book-match/] (The Other Match.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

* [https://www.w3docs.com/] (W3 Docs)
* [https://developer.mozilla.org/en-US/] (MDN Web Docs)
* [https://html.com/] (HTML for Beginners)
* [https://blog.hubspot.com/website/css-tutorial] (The Ultimate CSS Tutorial for Beginner Programmers)
* [https://www.w3schools.com/js/] (JavaScript Tutorial)
* [https://developer.mozilla.org/en-US/docs/Web/API] (APIs)
* [https://bulma.io/documentation/] (Bulma)
* [http://www.omdbapi.com/] (TMDB API)
* [https://openlibrary.org/] (OpenLibrary API)
