import { APICall } from './api_call';

const _ = require('lodash');

export class BookSearchData {
  constructor() {
    this.apiCall = new APICall();
  }

  async returnSortedData(query, maxResults = 10, orderBy = 'relevance') {
    const data = await this.apiCall.getSearchResultData(query, maxResults, orderBy);
    return this.formatData(data);
  }

  formatData(data) {
    const dataList = data.items;
    const sortedData = [];

    if(_.isEmpty(data) || _.isEmpty(dataList)) {
      return 'Sorry, no results found. Please try another search term.'
    }

    dataList.forEach((item) => {
      sortedData.push({
        title: this.verifyDataExists(item, 'volumeInfo.title'),
        author: this.verifyDataExists(item, 'volumeInfo.authors'),
        publisher: this.verifyDataExists(item, 'volumeInfo.publisher'),
        rating: this.verifyDataExists(item, 'volumeInfo.averageRating'),
        image: this.verifyDataExists(item, 'volumeInfo.imageLinks.thumbnail'),
        link: this.verifyDataExists(item, 'volumeInfo.canonicalVolumeLink')
      });
    });
    return sortedData;
  }

  verifyDataExists(obj, key) {
    if (_.has(obj, key)) {
      if(_.get(obj, key)) {
       return _.get(obj, key)
     }
    }

    switch (key) {
      case ('volumeInfo.imageLinks.thumbnail'):
        return '../assets/img/no-image.png';
        break;
      case ('volumeInfo.averageRating'):
        return 'not rated';
        break;
      default:
        return 'not available';
    }
  }

}
