const fetch = require('node-fetch');

import { GoogleBooksAPI } from '../src/google_books_api';

jest.mock("../src/google_books_api");

describe('GoogleBooksAPI', () => {

  describe('get search result data', () => {
    const googleBooksAPI = new GoogleBooksAPI();

    it('tests the getSearchResultData function', async () => {
      await googleBooksAPI.getSearchResultData("Harry Potter");
      expect(googleBooksAPI.getSearchResultData).toHaveBeenCalled()
      expect(googleBooksAPI.getSearchResultData).toHaveBeenCalledTimes(1)
      expect(googleBooksAPI.getSearchResultData).toHaveBeenCalledWith("Harry Potter")
    });
  });
});
