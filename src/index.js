import { addBackToTop } from 'vanilla-back-to-top';
import { BookSearchData } from './book_search_data';
import { GoogleBooksAPI } from './google_books_api';

const api = new GoogleBooksAPI();
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

function formatBookLink(key) {
  if (key === 'Not available') {
    return 'Further information unavailable for this book';
  }
  return `<a href="${key}" target="_blank">More information</a>`;
}

function resetDisplay() {
  warningMessage.innerHTML = '';
  searchResults.innerHTML = '';
}

function displaySearchResults(results) {
  const searchFieldInput = document.getElementById('search-field').value;
  const displaySearchTerm = document.createElement('p');
  displaySearchTerm.classList.add('display-search-term');
  displaySearchTerm.innerHTML = `Displaying results for "${searchFieldInput}":`;

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
    author.innerHTML = `by: ${book.author}`;
    publisher.innerHTML = `Publisher: ${book.publisher}`;
    rating.innerHTML = `Rating: <i class="fas fa-star"></i> ${book.rating}`;
    link.innerHTML = formatBookLink(book.link);
    image.src = book.image;

    bookDataImage.append(image);
    bookDataText.append(title, hr, author, publisher, rating, link);
    bookData.append(bookDataImage, bookDataText);
    searchResults.append(bookData);
  });
  searchResults.prepend(displaySearchTerm);
}

function displayError(message) {
  const error = document.createElement('p');
  error.classList.add('display-error');
  error.innerHTML = message;
  searchResults.prepend(error);
}

function checkIfResultsEmpty(results) {
  resetDisplay();
  if (results === 'Unexpected error occurred') {
    return displayError(results);
  } if (results === 'No results found. Please try again.') {
    return displayError(results);
  }
  return displaySearchResults(results);
}

async function requestSearchResults() {
  const searchFieldInput = document.getElementById('search-field').value;
  const resultsToDisplay = document.getElementById('results-to-display').value;
  if (searchFieldInput.length === 0) {
    return displayEmptyFieldWarning();
  }
  if (!resultsToDisplay || resultsToDisplay < 1 || resultsToDisplay > 40) {
    return displayIncorrectValueWarning();
  }
  const results = await bookSearchData.returnFormattedData(searchFieldInput, resultsToDisplay);
  return checkIfResultsEmpty(results);
}

submit.addEventListener('click', requestSearchResults);
