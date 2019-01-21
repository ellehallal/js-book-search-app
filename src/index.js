import { addBackToTop } from 'vanilla-back-to-top';
import { BookSearchData } from './book_search_data';
import { APICall } from './api_call';

const api = new APICall()
const bookSearchData = new BookSearchData(api);

const submit = document.getElementById('submit');
const searchResults = document.getElementById('search-results');
const warningMessage = document.getElementById('warning-message');

addBackToTop({
  diameter: 56,
  backgroundColor: '#ED9B40',
  textColor: '#FFF',
});

function displayEmptyFieldWarning() {
  warningMessage.innerHTML = '<p id="warning">Please enter a search term</p>';
  setTimeout(() => {
    warningMessage.innerHTML = '';
  }, 2000);
}

function displayIncorrectValueWarning() {
  warningMessage.innerHTML = '<p id="warning">Please select a number from 1 - 40</p>';
  setTimeout(() => {
    warningMessage.innerHTML = '';
  }, 2000);
}

function displaySearchResults(results) {
  const searchFieldInput = document.getElementById('search-field').value;
  const displaySearchTerm = document.createElement('p');
  displaySearchTerm.classList.add('display-search-term');
  displaySearchTerm.innerHTML = `Displaying results for "${searchFieldInput}":`;

  warningMessage.innerHTML = '';
  searchResults.innerHTML = '';

  results.forEach((book) => {
    const bookData = document.createElement('div');
    bookData.classList.add('book-data');
    const bookDataText = document.createElement('div');
    bookDataText.classList.add('book-data-text');
    const bookDataImage = document.createElement('div');
    bookDataImage.classList.add('book-data-image');

    const title = document.createElement('p');
    title.classList.add('book-title');
    const hr = document.createElement('hr');
    const author = document.createElement('p');
    const publisher = document.createElement('p');
    const rating = document.createElement('p');
    const image = document.createElement('img');
    const link = document.createElement('p');


    title.innerHTML = book.title;
    author.innerHTML = book.author;
    publisher.innerHTML = `Publisher: ${book.publisher}`;
    rating.innerHTML = `Rating: <i class="fas fa-star"></i> ${book.rating}`;
    image.src = book.image;

    if (book.link === 'not available') {
      link.innerHTML = 'Sorry, further information is not available for this book';
    } else {
      link.innerHTML = `<a href="${book.link}" target="_blank">Click here</a>  for more information`;
    }

    bookDataImage.append(image);
    bookDataText.append(title, hr, author, publisher, rating, link);
    bookData.append(bookDataImage, bookDataText);
    searchResults.append(bookData);
  });
  searchResults.prepend(displaySearchTerm);
}

function checkIfResultsEmpty(results) {
  if (results === 'Sorry, no results found. Please try another search term.') {
    return 'Sorry, no results found. Please try another search term.';
  }
  return displaySearchResults(results);

}

async function requestSearchResults() {
  const searchFieldInput = document.getElementById('search-field').value;
  const resultsToDisplay = document.getElementById('results-to-display').value;
  if (searchFieldInput.length === 0) {
    return displayEmptyFieldWarning();
  }
  if (resultsToDisplay.length === 0 || resultsToDisplay < 1 || resultsToDisplay > 40) {
    return displayIncorrectValueWarning();
  }
  const results = await bookSearchData.returnFormattedData(searchFieldInput, resultsToDisplay);
  return checkIfResultsEmpty(results);
}

submit.addEventListener('click', requestSearchResults);
