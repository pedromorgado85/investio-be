require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
import {polygonClient, restClient, websocketClient} from '@polygon.io/client-js';
const restApi= restClient('API KEY');

// const PolygonAPI = require('@polygon.io/client-js-web-api-node');

// const polygonApi = new PolygonAPI({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.API_KEY
// });

restApi
  //app.get('/', (req, res, next) => res.render('index'));

  app.get('/markets/stocks', (req, res, next) => {
    restApi
        .stocks()
        .then((data) => {
        res.render('stocks-search-results', {
          stocks: data.body.stocks
        });

        console.log('The received data from the API PEDRO: ', data.body);
        // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      })
      .catch((err) =>
        console.log('The error while searching artists occurred: ', err)
      );
  });