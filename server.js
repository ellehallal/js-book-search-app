const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

if (process.env.NODE_ENV == 'development') require('dotenv').config({ silent: true });

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port);
