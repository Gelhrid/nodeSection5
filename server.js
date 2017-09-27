const express = require('express');
const path = require('path');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '/public');

const port = process.env.PORT || 3000;
var app = express();

// var restify = require('restify');
// var restifyApp = restify.createServer();

// var router = express.Router();
// app.use("/api",router);

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// const server = restify.createServer({
//   name: 'myapp',
//   version: '1.0.0'
// });
// server.use(restify.plugins.acceptParser(server.acceptable));
// server.use(restify.plugins.queryParser());
// server.use(restify.plugins.bodyParser());
// server.get('/echo/:name', function (req, res, next) {
// // req.session.dupa = "XXX";
// // console.log(req.session.dupa);
//   res.send(req.params);
//   return next();
// });
// app.use('/api', restifyApp);
// server.listen(8080, function () {
//   console.log('%s listening at %s', server.name, server.url);
// });
// app.use((req, res, next) => {
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//
//   console.log(log);
//   // fs.appendFile('server.log', log + '\n', (err) => {
//   //
//   // });
//   next();
// });

// app.use((req, res, next) => {
// res.render('maintain.hbs');
// });
app.use(express.static(publicPath));


hbs.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    let button = `<button onclick='myFun(${items[i].id})'>BTN</button>`;
    out = out + "<li>" + options.fn(items[i]) + button +"</li>";
  }
  return out + "</ul>";
});

app.get('/tabelka', (req, res) => {


    res.render('tabelka.hbs', {
    pageTitle: 'TABLE!!!',
    people: [
    {firstName: "Yehuda", lastName: "Katz", id:1},
    {firstName: "Carl", lastName: "Lerche", id:2},
    {firstName: "Alan", lastName: "Johnson", id:3}
  ]
    });
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Siema Stary'
  });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
    pageTitle: 'About Page!'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
    pageTitle: 'Projects Page!',
    info: 'some info about projects'
    });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'blad'
  });
});

app.listen(port, () => {
  console.log(`server slcuha na porcie: ${port}`);
});
