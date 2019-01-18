import { FormatData } from '../src/format_data';


describe('Format Data Class', () => {

  let formatData;
   beforeEach(() => {
     formatData = new FormatData();
   });

  describe('returnSortedData()', () => {

    it('returns relevant book data as an array of objects', async () => {
      const data = await formatData.returnSortedData("Harry Potter", 10);
      expect(data.length).toEqual(10)
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
