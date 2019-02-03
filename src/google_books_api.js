const fetch = require('node-fetch');
require('dotenv').config();

export class GoogleBooksAPI {
  async getSearchResultData(query, maxResults) {
    const encodeQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeQuery}&maxResults=${maxResults}`;

    try {
      const response = await fetch(`${url}&key=${process.env.KEY}`);
      return await response.json();
    } catch (error) {
      return 'Unexpected error occurred';
    }
  }
}
