'use strict';

const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser')

const app = express();

app.listen(1337, function () {
  console.log('Server listening on port', 1337);
});

app.use(volleyball);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname));

app.use('/files', require('./files'))
