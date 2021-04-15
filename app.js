const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const createError = require('http-errors');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const baseRouter = require('./routes/index');
const cors = require('cors');

require('./configs/passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3001'] // <=URL of React app (it will be running on port 3000)
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
