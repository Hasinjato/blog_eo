const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
// const methodOverride = require('method-override')
const routes = require('./routes/index');
const { createAllForDb } = require('./db');
require('dotenv').config();

async function startApp() {
  await createAllForDb();

  // // Use parsing middleware
  // app.use(bodyParser.json());
  // app.use(cookieParser());
  // app.use(cors);


  // Les fichiers statiques sont dans public
  app.use(express.static(path.join(__dirname,'public')));

  // Middleware
  app.use(bodyParser.urlencoded({ extended: true}));

  //  COnfiguration
  app.set('views','./src/views');
  app.set('view engine', 'ejs');

  // app.set('view engine', 'html');

  // config session pour l'auth
  app.use(session({
    secret: 'ab67728928cd976e898d70e89c9797',
    resave: false,
    saveUninitialized: false,
  }));

  // Middelware DELETE
  // app.use(methodOverride('_method'));

  // Routes
  app.use('/', routes);

  app.use((req, res, next) => {
      res.status(404).render('error404');
  });




  // Server
  app.listen(3000, () => {
      console.log('Server is running on localhost:3000');
  });
}
startApp().catch(console.error);