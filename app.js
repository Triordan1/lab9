var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var lab9Router = require('./routes/lab9');
app.use('/lab9',lab9Router);
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Express server is running...");
});
module.exports = app;