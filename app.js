// Import module
const app = require('express')();
const bodyParser = require('body-parser')
const router = require('./router');
const error = require('./errors/notFound');
const path = require('path');

const port = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// app.set('views', './views');
// app.set('view engine', path.join(__dirname, "views"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use('/', router);

app.get('/', (req, res, next) => {
  res.json({ data: {  message: 'Error 404 : NOT_API_AVAILABLE' } });
  res.redirect(301, '/games');
});

app.use((req, res, next) => {
  throw new error.NotFoundError()
});

app.use((err, req, res, next) => {  
  if (!(err instanceof error.HttpError)) {
    console.error(err)
    err = new error.ServerError()
  }

  return res.status(err.status || 500).json({ err })
});

app.listen(port);