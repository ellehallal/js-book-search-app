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
      const data = bookSearchData.returnSortedData("Harry Potter", 10);
      const mockAPICallInstance = APICall.mock.instances[0];
      const mockGetSearchResultData = mockAPICallInstance.getSearchResultData;
      expect(mockGetSearchResultData).toHaveBeenCalledTimes(1);
      expect(mockGetSearchResultData).toHaveBeenCalledWith("Harry Potter", 10);
    });
  });

  describe('formatData()', () => {

    it('returns "Sorry, no results found. Please try another search term." if no results returned from search', () => {
      const emptyData = {};
      const emptyList = [];
      const checkWithEmptyData = bookSearchData.formatData(emptyData);
      const checkWithEmptyList = bookSearchData.formatData(emptyList);

      expect(checkWithEmptyData).toEqual('Sorry, no results found. Please try another search term.');
      expect(checkWithEmptyList).toEqual('Sorry, no results found. Please try another search term.');
    });

    it('only returns the requested information from the data', () => {
      const data = {"items": [{"volumeInfo": {"title": "Grenada", "datePublished": "2017-05-25", "price": 20, "authors": ["Maurice Bishop"], "publisher": "Spice Isle Books", "averageRating": 5, "imageLinks": {"thumbnail": 'https://test.com/test.png'}, "canonicalVolumeLink": "https://grenada.com"}}]};
      const formattedData = bookSearchData.formatData(data);

      expect(Object.keys(formattedData[0]).length).toEqual(6);
      expect(formattedData).toEqual([{title: "Grenada", author: ["Maurice Bishop"], publisher: "Spice Isle Books", rating: 5, image: 'https://test.com/test.png', link: "https://grenada.com"}]);
    });
  });

  describe('verifyDataExists()', () => {
    const data = {"volumeInfo": {"title": "Grenada", "authors": null, "imageLinks": {"thumbnail": null}"averageRating": null}};

    it('returns the value if the key exists, and the value is not null', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.title');
      expect(formattedData).toEqual('Grenada');
    });

    it('returns "Author information unavailable" if the value of authors is null', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.authors');
      expect(formattedData).toEqual('Author information unavailable');
    });

    it('returns "./assets/img/no-image.png" if the value of thumbnail is null', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.imageLinks.thumbnail');
      expect(formattedData).toEqual('./assets/img/no-image.png');
    });

    it('returns "Not available" if the key does not exist', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.canonicalVolumeLink');
      expect(formattedData).toEqual('Not available');
    });

  });


});
