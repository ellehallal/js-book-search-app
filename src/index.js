import { BookSearchData } from './book_search_data';

const bookSearchData = new BookSearchData();


const submit = document.getElementById('submit');
const submitQuery = document.getElementById('submit-query');
const searchResults = document.getElementById('search-results')

submit.addEventListener('click', async function (){
  let searchFieldInput = document.getElementById('search-field').value;
  if(searchFieldInput.length === 0) {
    searchResults.innerHTML = "Please enter a search term"
  } else {
    const results = await bookSearchData.returnSortedData(searchFieldInput)
    return displaySearchResults(results)
  }

})

function displaySearchResults(results) {
  searchResults.innerHTML = ""
  results.forEach((book) => {
    const bookData = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const publisher = document.createElement('p');
    const rating = document.createElement('p');
    const link = document.createElement('p');
    const image = document.createElement('img');

    title.innerHTML = `Title: ${book.title}`;
    author.innerHTML = `Author(s): ${book.author}`;
    publisher.innerHTML = `Publisher: ${book.publisher}`;
    rating.innerHTML = `Rating: ${book.rating}`;
    link.innerHTML = book.link
    image.src = book.image

    bookData.append(title,author,publisher,rating,link,image);
    console.log(bookData)
    searchResults.appendChild(bookData)
  })

}
