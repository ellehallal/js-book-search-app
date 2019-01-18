import { APICall } from './api_call';

export class FormatData {
  constructor(){
    this.apiCall = new APICall()
  }

  async returnSortedData(query, maxResults = 10, orderBy = 'relevance') {
    const data = await this.apiCall.getSearchResultData(query, maxResults, orderBy);
    return this.formatData(data);

  }

  formatData(data) {
    const dataList = data.items;
    const sortedData = [];
    const notAvailable = 'Not available';
    const imageNotAvailable = '../assets/img/no-image.png'

    dataList.forEach((item) => {
      sortedData.push({
        title: item.volumeInfo.title || notAvailable,
        author: item.volumeInfo.authors || notAvailable,
        publisher: item.volumeInfo.publisher || notAvailable,
        rating: item.volumeInfo.averageRating || notAvailable,
        image: item.volumeInfo.imageLinks.thumbnail || imageNotAvailable,
        link: item.volumeInfo.canonicalVolumeLink || notAvailable,
      })
    })
    return sortedData
  }
}
