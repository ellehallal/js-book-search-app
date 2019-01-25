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
        title: this.setValue(item, 'volumeInfo.title'),
        author: this.setValue(item, 'volumeInfo.authors'),
        publisher: this.setValue(item, 'volumeInfo.publisher'),
        rating: this.setValue(item, 'volumeInfo.averageRating'),
        image: this.setValue(item, 'volumeInfo.imageLinks.thumbnail'),
        link: this.setValue(item, 'volumeInfo.canonicalVolumeLink'),
      });
    });
    return formattedData;
  }

  async returnFormattedData(query, maxResults) {
    try {
      const data = await this.getSearchResultData(query, maxResults);
      if (_.isEqual(data, `${query} not found`)) {
        return `${query} not found`;
      }
      return this.formatData(data);
    } catch (error) {
      return `${query}: Unexpected error occurred`;
    }
  }

  verifyDataExists(obj, key) {
    if (_.has(obj, key)) {
      if (_.get(obj, key)) {
        return true;
      }
    }
    return false;
  }

  setValue(obj, key) {
    if (this.verifyDataExists(obj, key)) {
      return _.get(obj, key);
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
}
