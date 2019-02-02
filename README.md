# Bookish - A Book Search Application

A responsive web app that allows you to use the [Google Books API](https://developers.google.com/books/docs/overview) to search for books.

[View Bookish on Heroku](https://bookish-00.herokuapp.com).

## Contents
  - [Screenshot](#screenshot)
  - [Application Requirements](#application-requirements)
  - [Install](#install)
  - [Test](#test)
      - [To run tests:](#to-run-tests)
  - [Code review feedback](#code-review-feedback)
  - [Edge cases considered](#edge-cases-considered)

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

Bookish can be viewed on [Heroku](https://bookish-00.herokuapp.com). Alternatively, it can be run locally:

Note: You can download node and npm from [here](https://www.npmjs.com/get-npm), if not already installed.

```
git clone https://github.com/itsellej/js-book-search-app.git
cd js-book-search-app
```
to be able to search for books, create an `.env`file in the root directory, and add your [Google Books API](https://developers.google.com/books/docs/v1/using#APIKey) key, e.g:

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

## Code review feedback

####Security Vunerability
- **Issue:** the app is susceptible to injection attacks. E.g. a query of `Harry Potter&foo=bar&key=12345#` will send a HTTP request with a param called "foo" and a key overwriting all of the params that is specified in the code.
- **Comment:** This is a new concept I'm being introduced to. I think this may be due to [DOM-based Cross-Site Scripting](https://www.owasp.org/index.php/Testing_for_Cross_site_scripting#Description_of_Cross-site_scripting_Vulnerabilities).
- **Solution:** In the [GoogleBooksAPI](https://github.com/itsellej/js-book-search-app/blob/master/src/google_books_api.js) class, `getSearchResultData()` takes a parameter `query` from the user. By calling `encodeURIComponent()` on `query`, URL reserved characters are replaced with their UTF-8 encoding. This is done before the API request is made.
For example, the query above is encoded to:
`Harry%20Potter%26foo%3Dbar%26key%3D12345%23`

## Edge cases considered

- If a book cover image is not available, a [placeholder image](https://github.com/itsellej/js-book-search-app/blob/master/dist/assets/img/no-image.png) is displayed. The image is located in `./dist/assets/img/`.

- If the requested information (authors, publisher or rating) is unavailable, _'Author information unavailable', 'Not rated',_ or _'Not available'_ is displayed.

- If a user does not enter a query, or select to display between 1-40 results, an error message displays, and a request to the Google Books API is not actioned.

- A `mixed content` error displayed in the browser console, due to Google Books API providing an insecure thumbnail image link (http://). In BookSearchData class, the `httpToHttps` method replaces http:// with https://.

- Displays '*No results found. Please try again.*' if the API call returned 0 book items.
