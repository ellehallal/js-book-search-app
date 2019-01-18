const fetch = require('node-fetch');

require('dotenv').config();

export class APICall {
  async getSearchResultData(query, maxResults = 10, orderBy = 'relevance') {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&orderBy=${orderBy}`;

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
