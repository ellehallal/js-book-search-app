import { FormatData } from '../src/format_data';
import { APICall } from '../src/api_call';

jest.mock('../src/api_call');


describe('Format Data Class', () => {

  let formatData;
   beforeEach(() => {
     formatData = new FormatData();
   });

  describe('returnSortedData()', () => {

    it('mock - checks if returnSortedData calls the APICall function, getSearchResultData', () => {
      const data = formatData.returnSortedData("Harry Potter");
      const mockAPICallInstance = APICall.mock.instances[0];
      const mockGetSearchResultData = mockAPICallInstance.getSearchResultData
      expect(mockGetSearchResultData).toHaveBeenCalledTimes(1)
      expect(mockGetSearchResultData).toHaveBeenCalledWith("Harry Potter", 10, 'relevance')
    });
  });

    describe('formatData()', () => {

      it('only returns the requested information', () => {
        const data = {"items": [{"volumeInfo": {"title": "Grenada", "datePublished": "2017-05-25", "price": 20, "authors": ["Maurice Bishop"], "publisher": null, "averageRating": 5, "imageLinks": {"thumbnail": null}, "canonicalVolumeLink": "https://grenada.com"}}]}

        const formattedData = formatData.formatData(data)
        expect(formattedData).toEqual([{title: "Grenada", author: ["Maurice Bishop"], publisher: 'Not available', rating: 5, image: '../assets/img/no-image.png', link: "https://grenada.com"}])
      });
  });
});
