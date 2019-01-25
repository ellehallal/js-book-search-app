const fetch = require('node-fetch');

export class GoogleBooksAPI {
  async getSearchResultData(query, maxResults) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`;

    try {
      const response = await fetch(`${url}&key=${process.env.KEY}`);

      if (response.ok) {
        const data = await response.json();
        return data.items;
      }
      throw new Error('Unexpected error occurred');
    } catch (error) {
      return error;
    }
  }
}
