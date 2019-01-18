import { FormatData } from '../src/format_data';


describe('Format Data', () => {

  let formatData;
   beforeEach(() => {
     formatData = new FormatData();
   });

  describe('return sorted data', () => {

    it('returns relevant book data as an array of objects', async () => {
      const data = await formatData.returnSortedData("Harry Potter", 10);
      expect(data.length).toEqual(10)

    });
  });
});
