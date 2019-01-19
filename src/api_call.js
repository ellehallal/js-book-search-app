const fetch = require('node-fetch');

if (process.env.NODE_ENV == 'development') require('dotenv').config({ silent: true });

export class APICall {
  async getSearchResultData(query, maxResults) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`;

    try {
      const response = await fetch(`${url}&key=${process.env.KEY}`);
      const data = await response.json();

      if (!data) return `${query} not found`;
      return data;
    } catch (error) {
      return `${query}: Unexpected error occurred`;
    }
  }
}
