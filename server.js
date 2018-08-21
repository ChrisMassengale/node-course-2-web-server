
const express = require('express');

//Handlebars -- view engine for Express
//handleBar Docs --  http://handlebarsjs.com/
//npmPackage -- https://www.npmjs.com/package/hbs
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials'); //registers directory for partials
app.set('view engine', 'hbs');


app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});


//NOTE WITH OUT A NEXT() call Page shows Maintenance and stops here.
// ORDER MATTERS -- if the App.use after this call is above, it will allow user 
// to use.
app.use((request, response, next) => {
  response.render('maintenance.hbs', {
    pageTitle: "UNDER MAINTENANCE FART FACES!!"
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (request, response) => {
    // response.send('<h1>Hello Express</h1>');


    // originally ..
    // response.send({
    //   name: 'Andrew',
    //   likes: [
    //     'coding',
    //     'dog walking',
    //     'not real estate'
    //   ]
    // });

    //use rendering through handlebars
    response.render('home.hbs',{
      pageTitle: "WELCOME FART FACE",
      welcomeMessage: "so glad you're here FART FACE"
    });
});


app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage:'404 YOU SUCK!!!'
  });
});
app.listen(3000, () => {
  console.log('Server is up on Port 3000');
});