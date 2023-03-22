const express = require('express'); 
const app = express(); 
const apiRoutes = require('./routes');
const morgan = require('morgan');
const errorHandler = require('./utils/errorHandler');
const bodyparser = require('body-parser');
const AppError = require('./utils/AppError');

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// body parser
app.use(bodyparser.json(
    {
        limit: '50mb'
    }
));

app.use('/api',apiRoutes); 

// using a global error handler
app.use(errorHandler);

// if request is not handled by any route
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app