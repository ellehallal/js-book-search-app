import { BookSearchData } from './book_search_data';

const bookSearchData = new BookSearchData();


const submit = document.getElementById('submit');
const submitQuery = document.getElementById('submit-query');

submit.addEventListener('click', async function (){
  console.log('hello')
  const searchFieldInput = document.getElementById('search-field').value;
  const results = await bookSearchData.returnSortedData(searchFieldInput)
  console.log(results)
})
