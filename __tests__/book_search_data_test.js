import { BookSearchData } from '../src/book_search_data';
import { GoogleBooksAPI } from '../src/google_books_api';

jest.mock('../src/google_books_api');

describe('Book Search Data class', () => {

  let bookSearchData;
  let api;
   beforeEach(() => {
     api = new GoogleBooksAPI();
     bookSearchData = new BookSearchData(api);
   });

   describe('getSearchResultData()', () => {

     it('mock - checks if getSearchResultData calls the api class function, getSearchResultData', () => {
       const data = bookSearchData.getSearchResultData("Harry Potter", 10);
       const mockAPICallInstance = GoogleBooksAPI.mock.instances[0];
       const mockGetSearchResultData = mockAPICallInstance.getSearchResultData;
       expect(mockGetSearchResultData).toHaveBeenCalledTimes(1);
       expect(mockGetSearchResultData).toHaveBeenCalledWith("Harry Potter", 10);
     });
   });

  describe('returnFormattedData()', () => {

    it('checks if returnFormattedData calls the api class function, getSearchResultData', () => {
      const data = bookSearchData.returnFormattedData("Harry Potter", 10);
      const mockAPICallInstance = GoogleBooksAPI.mock.instances[0];
      const mockGetSearchResultData = mockAPICallInstance.getSearchResultData;
      expect(mockGetSearchResultData).toHaveBeenCalledTimes(1);
      expect(mockGetSearchResultData).toHaveBeenCalledWith("Harry Potter", 10);
    });
  });

  describe('formatData()', () => {

    it('returns "Sorry, no results found. Please try another search term." if no results returned from search', () => {
      const emptyData = [];
      const formattedData = bookSearchData.formatData(emptyData);

      expect(formattedData).toEqual('Sorry, no results found. Please try another search term.');
    });

    it('only returns the requested information from the data', () => {
      const data = [{"volumeInfo": {"title": "Grenada", "datePublished": "2017-05-25", "price": 20, "authors": ["Maurice Bishop"], "publisher": "Spice Isle Books", "averageRating": 5, "imageLinks": {"thumbnail": 'https://test.com/test.png'}, "canonicalVolumeLink": "https://grenada.com"}}];
      const formattedData = bookSearchData.formatData(data);

      expect(Object.keys(formattedData[0]).length).toEqual(6);
      expect(formattedData).toEqual([{title: "Grenada", author: ["Maurice Bishop"], publisher: "Spice Isle Books", rating: 5, image: 'https://test.com/test.png', link: "https://grenada.com"}]);
    });
  });

  describe('verifyDataExists()', () => {
    const data = {"volumeInfo": {"title": "Grenada", "authors": null, "imageLinks": {"thumbnail": null}}};

    it('returns true if the key and value exists', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.title');
      expect(formattedData).toEqual(true);
    });

    it('returns false if the key but the value is null', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.authors');
      expect(formattedData).toEqual(false);
    });

    it('returns false if the key does not exist', () => {
      const formattedData = bookSearchData.verifyDataExists(data, 'volumeInfo.averageRaing');
      expect(formattedData).toEqual(false);
    });
  });

  describe('setValue()', () => {
    const data = {"volumeInfo": {"title": "Grenada", "authors": null, "imageLinks": {"thumbnail": null}, "averageRating": null}};

    it('returns the value if the key exists, and the value is not null', () => {
      const formattedData = bookSearchData.setValue(data, 'volumeInfo.title');
      expect(formattedData).toEqual('Grenada');
    });

    it('returns "Author information unavailable" if the value of authors is null', () => {
      const formattedData = bookSearchData.setValue(data, 'volumeInfo.authors');
      expect(formattedData).toEqual('Author information unavailable');
    });

    it('returns "./assets/img/no-image.png" if the value of thumbnail is null', () => {
      const formattedData = bookSearchData.setValue(data, 'volumeInfo.imageLinks.thumbnail');
      expect(formattedData).toEqual('./assets/img/no-image.png');
    });

    it('returns "Not available" if the key does not exist', () => {
      const formattedData = bookSearchData.setValue(data, 'volumeInfo.canonicalVolumeLink');
      expect(formattedData).toEqual('Not available');
    });

    it('returns "Not Rated" if the "averageRating" key does not exist', () => {
      const formattedData = bookSearchData.setValue(data, 'volumeInfo.averageRating');
      expect(formattedData).toEqual('Not rated');
    });
  });
});
