# Bookish - A Book Search Application

A web app that allows you to use the [Google Books API](https://developers.google.com/books/docs/overview) to search for books.
[View Bookish on Heroku](https://bookish-00.herokuapp.com).

## Screenshot

![Bookish App Screenshot](dist/assets/img/bookish-app.png)

## Application Requirements

The application should allow the user to:
- Type in a query and view a list of books matching that query.
- View the following for each book:
  - Title
  - Authors
  - Publishing company
  - Cover image
- Navigate to more information about the book.

## Install

Bookish can be viewed on [Heroku](https://bookish-00.herokuapp.com).
Alternatively, it can be run locally:

Note: You can download node and npm from [here](https://www.npmjs.com/get-npm), if not already installed.

```
git clone https://github.com/itsellej/js-book-search-app.git
cd js-book-search-app
```
Note: to be able to search for books, create `.env` file in the root directory and add your [Google Books API](https://developers.google.com/books/docs/v1/using#APIKey) key, e.g:

```
KEY=39880032APIKEYetc
```

```
npm install
npm run build
npm start
```
Navigate to `http://localhost:8080` in your browser.

## Test

The testing library used is [Jest](https://jestjs.io/). Two test suites are included:
1. To test the GoogleBooksAPI class, which makes a request to the Google Books API.
2. To test that the Book Search Data class formats the data from the Google Books API.

#### To run tests:

`npm run test`

## Misc.

- If a book cover image is not available, a [placeholder image](https://github.com/itsellej/js-book-search-app/blob/master/dist/assets/img/no-image.png) is displayed. The image is located in `./dist/assets/img/`.

- If the requested information (authors, publisher or rating) is unavailable, _'Author information unavailable', 'Not rated',_ or _'Not available'_ is displayed.

- If a user does not enter a query, or select to display between 1-40 results, an error message displays, and a request to the Google Books API is not actioned.

- A `mixed content` error displayed in the browser console, due to Google Books API providing an insecure thumbnail image link (http://). In BookSearchData class, the `httpToHttps` method replaces http:// with https://.

- Responsive design.
