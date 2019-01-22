const fetch = require('node-fetch');
const _ = require('lodash');

export class APICall {
  async getSearchResultData(query, maxResults) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`;

    try {
      const response = await fetch(`${url}&key=${process.env.KEY}`);
      const data = await response.json();

      if (_.isEmpty(data)) return `${query} not found`;
      return data;
    } catch (error) {
      return `${query}: Unexpected error occurred`;
    }
  }
}
