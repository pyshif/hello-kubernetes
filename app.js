const path = require('path');
const createError = require('http-errors');
const express = require('express');
const app = express();

// static
app.use(express.static(path.join(__dirname, 'public')));

// services
app.use('/health', (req, res, next) => {
    res.status(200).json({ code: '200 OK' });
});

app.use('/long-task', (req, res, next) => {
    setTimeout(() => {
        res.status(200).send({ code: '200 OK' });
    }, 100);
});

// error
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;