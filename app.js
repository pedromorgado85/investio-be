require('dotenv').config();
require('./configs/passport');

// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const baseRouter = require('./routes/index');
const cors = require('cors');
const MongoStore = require('connect-mongo');


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const options = {
  mongoUrl: process.env.MONGODB_URI,
  ttl: 14 * 24 * 60 * 60
};

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create(options),
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    }

    // ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
  }),
);

app.use(
  cors({
    credentials: true,
    origin: (process.env.FE_POINT || '').split(',') // <=URL of React app (it will be running on port 3000)

  })
);

app.use(passport.initialize());
app.use(passport.session());


// ROUTES MIDDLEWARE STARTS HERE:
const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

const investorProfileRoutes = require('./routes/investorProfile-routes');
app.use('/api', investorProfileRoutes);

const stocksRoutes = require('./routes/markets/stocks-routes');
app.use('/api', stocksRoutes);

const assetRoutes = require('./routes/asset-route');
app.use('/api', assetRoutes);

app.use('/', baseRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
