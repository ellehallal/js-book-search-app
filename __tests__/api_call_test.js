const fetch = require('node-fetch');

import { APICall } from '../src/api_call';

jest.mock("../src/api_call");

describe('API Call', () => {

  describe('get search result data', () => {
    const apiCall = new APICall();

    it('tests the getSearchResultData function', async () => {
      await apiCall.getSearchResultData("Harry Potter");
      expect(apiCall.getSearchResultData).toHaveBeenCalled()
      expect(apiCall.getSearchResultData).toHaveBeenCalledTimes(1)
      expect(apiCall.getSearchResultData).toHaveBeenCalledWith("Harry Potter")
    });
  });
});
