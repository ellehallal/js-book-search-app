const fetch = require('node-fetch');

import { GoogleBooksAPI } from '../src/google_books_api';

jest.mock("../src/google_books_api");

describe('GoogleBooksAPI', () => {

  describe('get search result data', () => {
    const api = new GoogleBooksAPI();

    it('tests the getSearchResultData function', async () => {
      await api.getSearchResultData("Harry Potter");
      expect(api.getSearchResultData).toHaveBeenCalled()
      expect(api.getSearchResultData).toHaveBeenCalledTimes(1)
      expect(api.getSearchResultData).toHaveBeenCalledWith("Harry Potter")
    });
  });
});
