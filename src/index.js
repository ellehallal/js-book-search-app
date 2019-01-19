import { BookSearchData } from './book_search_data';

const bookSearchData = new BookSearchData();

const submit = document.getElementById('submit');
const searchResults = document.getElementById('search-results');

submit.addEventListener('click', async function () {
  const searchFieldInput = document.getElementById('search-field').value;
  if (searchFieldInput.length === 0) {
    searchResults.prepend('Please enter a search term');
  } else {
    const results = await bookSearchData.returnSortedData(searchFieldInput);
    return displaySearchResults(results);
  }
});

function displaySearchResults(results) {
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
    author.innerHTML = `By: ${book.author}`;
    publisher.innerHTML = `Publisher: ${book.publisher}`;
    rating.innerHTML = `Rating: ${book.rating}`;
    image.src = book.image;

    if (book.link === 'not available') {
      link.innerHTML = `More info: ${book.link}`;
    } else {
      link.innerHTML = `<a href="${book.link}" target="_blank">Click here</a>  for more information`;
    }

    bookDataImage.append(image);
    bookDataText.append(title, hr, author, publisher, rating, link);
    bookData.append(bookDataImage, bookDataText);
    searchResults.append(bookData);
  });
}
