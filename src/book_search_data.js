const _ = require('lodash');

export class BookSearchData {
  constructor(api) {
    this.api = api;
  }

  getSearchResultData(query, maxResults) {
    return this.api.getSearchResultData(query, maxResults);
  }

  formatData(data) {
    const dataList = data.items;
    const formattedData = [];

    if (_.isEmpty(data) || _.isEmpty(dataList)) {
      return 'Sorry, no results found. Please try another search term.';
    }

    dataList.forEach((item) => {
      formattedData.push({
        title: this.verifyDataExists(item, 'volumeInfo.title'),
        author: this.verifyDataExists(item, 'volumeInfo.authors'),
        publisher: this.verifyDataExists(item, 'volumeInfo.publisher'),
        rating: this.verifyDataExists(item, 'volumeInfo.averageRating'),
        image: this.verifyDataExists(item, 'volumeInfo.imageLinks.thumbnail'),
        link: this.verifyDataExists(item, 'volumeInfo.canonicalVolumeLink'),
      });
    });
    return formattedData;
  }

  verifyDataExists(obj, key) {
    if (_.has(obj, key)) {
      if (_.get(obj, key)) {
        return _.get(obj, key);
      }
    }
    switch (key) {
      case ('volumeInfo.authors'):
        return 'Author information unavailable';
      case ('volumeInfo.imageLinks.thumbnail'):
        return './assets/img/no-image.png';
      case ('volumeInfo.averageRating'):
        return 'Not rated';
      default:
        return 'Not available';
    }
  }

  async returnFormattedData(query, maxResults) {
    const data = await this.getSearchResultData(query, maxResults);
    return this.formatData(data);
  }
}
