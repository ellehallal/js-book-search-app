import { BookSearchData } from '../src/book_search_data';
import { APICall } from '../src/api_call';

jest.mock('../src/api_call');


describe('Book Search Data class', () => {

  let bookSearchData;
   beforeEach(() => {
     bookSearchData = new BookSearchData();
   });

  describe('returnSortedData()', () => {

    it('mock - checks if returnSortedData calls the APICall function, getSearchResultData', () => {
      const data = bookSearchData.returnSortedData("Harry Potter");
      const mockAPICallInstance = APICall.mock.instances[0];
      const mockGetSearchResultData = mockAPICallInstance.getSearchResultData
      expect(mockGetSearchResultData).toHaveBeenCalledTimes(1)
      expect(mockGetSearchResultData).toHaveBeenCalledWith("Harry Potter", 10, 'relevance')
    });


  });

  describe('formatData()', () => {

    const data = {"items": [{"volumeInfo": {"title": "Grenada", "datePublished": "2017-05-25", "price": 20, "authors": ["Maurice Bishop"], "publisher": null, "averageRating": null, "imageLinks": {"thumbnail": null}, "canonicalVolumeLink": "https://grenada.com"}}]}

    it('only returns the requested information from the data', () => {
      const formattedData = bookSearchData.formatData(data)
      expect(Object.keys(formattedData[0]).length).toEqual(6)
      expect(formattedData).toEqual([{title: "Grenada", author: ["Maurice Bishop"], publisher: 'not available', rating: 'not rated', image: '../assets/img/no-image.png', link: "https://grenada.com"}])
    });

    it('returns "Sorry, no results found. Please try another search term." if no results returned from search', () => {
      const emptyData = {}
      const emptyList = []
      const checkWithEmptyData = bookSearchData.formatData(emptyData)
      const checkWithEmptyList = bookSearchData.formatData(emptyList)

      expect(checkWithEmptyData).toEqual('Sorry, no results found. Please try another search term.')
      expect(checkWithEmptyList).toEqual('Sorry, no results found. Please try another search term.')
    });

  });


});
