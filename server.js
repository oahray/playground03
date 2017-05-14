const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
 res.render('home.hbs', {
   pageTitle: 'Palacio de Ray',
   welcomeMessage: 'Welcome to my website'
 })
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Ray'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    status: 'bad',
    errorMessage: 'Error handling request'
  })
});

app.listen(port, () => console.log(`Server is up on port ${port}`));