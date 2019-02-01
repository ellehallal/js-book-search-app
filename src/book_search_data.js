const _ = require('lodash');

export class BookSearchData {
  constructor(api) {
    this.api = api;
  }

  getSearchResultData(query, maxResults) {
    return this.api.getSearchResultData(query, maxResults);
  }

  async returnFormattedData(query, maxResults) {
    try {
      const data = await this.getSearchResultData(query, maxResults);
      return this.formatData(data);
    } catch (error) {
      return 'Unexpected error occurred';
    }
  }

  formatData(data) {
    const dataList = data.items;
    const formattedData = [];

    if (data === 'Unexpected error occurred') {
      return data;
    } if (data.totalItems === 0) {
      return 'No results found. Please try again.';
    }

    dataList.forEach((item) => {
      formattedData.push({
        title: this.setValue(item, 'volumeInfo.title'),
        author: (this.setValue(item, 'volumeInfo.authors')).join(', '),
        publisher: this.setValue(item, 'volumeInfo.publisher'),
        rating: this.setValue(item, 'volumeInfo.averageRating'),
        image: this.httpToHttps(this.setValue(item, 'volumeInfo.imageLinks.thumbnail')),
        link: this.setValue(item, 'volumeInfo.canonicalVolumeLink'),
      });
    });
    return formattedData;
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
        return ['Author information unavailable'];
      case ('volumeInfo.imageLinks.thumbnail'):
        return './assets/img/no-image.png';
      case ('volumeInfo.averageRating'):
        return 'Not rated';
      default:
        return 'Not available';
    }
  }

  httpToHttps(string) {
    return string.replace('http://', 'https://');
  }
}
