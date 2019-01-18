const fetch = require('node-fetch');

import { APICall } from '../src/api_call';

describe('API Call', () => {

  describe('get search result data', () => {
    const apiCall = new APICall();

    it('tests the getSearchResultData function', async () => {
      const data = await apiCall.getSearchResultData("Harry Potter");
      console.log(data.kind)
      expect(data.kind).toEqual('books#volumes')
    });

  });
});
