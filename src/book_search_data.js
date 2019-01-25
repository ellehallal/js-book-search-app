const _ = require('lodash');

export class BookSearchData {
  constructor(api) {
    this.api = api;
  }

  getSearchResultData(query, maxResults) {
    return this.api.getSearchResultData(query, maxResults);
  }

  formatData(data) {
    const formattedData = [];

    if (data === 'Unexpected error occurred') {
      return 'Sorry, an unexpected error occured. Please try again.';
    }

    data.forEach((book) => {
      formattedData.push({
        title: this.setValue(book, 'volumeInfo.title'),
        author: this.setValue(book, 'volumeInfo.authors'),
        publisher: this.setValue(book, 'volumeInfo.publisher'),
        rating: this.setValue(book, 'volumeInfo.averageRating'),
        image: this.setValue(book, 'volumeInfo.imageLinks.thumbnail'),
        link: this.setValue(book, 'volumeInfo.canonicalVolumeLink'),
      });
    });
    return formattedData;
  }

  async returnFormattedData(query, maxResults) {
    try {
      const response = await this.getSearchResultData(query, maxResults);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error('Unexpected error occurred');
    } catch (error) {
      return error;
    }
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

  verifyDataExists(obj, key) {
    if (_.has(obj, key)) {
      if (_.get(obj, key)) {
        return true;
      }
    }
    return false;
  }
}
