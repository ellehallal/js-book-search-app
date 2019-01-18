import { APICall } from './api_call';

export class FormatData {
  constructor(){
    this.apiCall = new APICall()
  }

  async returnSortedData(query, maxResults, orderBy) {
    const data = await this.apiCall.getSearchResultData(query, maxResults, orderBy);

    const dataList = data.items
    const sortedData = []

    dataList.forEach((item) => {
      sortedData.push({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        rating: item.volumeInfo.averageRating,
        image: item.volumeInfo.imageLinks.thumbnail,
        link: item.volumeInfo.canonicalVolumeLink
      })
    })
    return sortedData
  }
}
