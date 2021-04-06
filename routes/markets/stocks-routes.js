require('dotenv').config();
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const { polygonClient, restClient } = require('@polygon.io/client-js');
const restApi = restClient(process.env.POLYGON_API_KEY);

//app.get('/', (req, res, next) => res.render('index'));

router.get('/markets/stocks', (req, res, next) => {
  restApi
    .stocks()
    .then((data) => {
      //   res.render(
      //     'stocks-https://api.polygon.io/v1/open-close/AAPL/2020-10-14?unadjusted=true&apiKey=GZ_KJQpIXa8OpopkVXphHseY3avFN8mh-results',
      //     {
      //       stocks: data.params.stocks
      //     }
      //   );

      console.log('The received data from the API PEDRO: ', data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch((err) =>
      console.log('The error while searching artists occurred: ', err)
    );
});

module.exports = router;
