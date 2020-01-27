// Import module
const app = require('express')();
const bodyParser = require('body-parser')
const router = require('./router');
const error = require('./errors/notFound');

const port = 8080;

// const db = 

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', router);

app.get('/', (req, res, next) => {
  res.json({ data: {  message: 'hello world' } })
})

app.use((req, res, next) => {
  throw new error.NotFoundError()
})

app.use((err, req, res, next) => {  
  if (!(err instanceof error.HttpError)) {
    console.error(err)
    err = new error.ServerError()
  }

  return res.status(err.status || 500).json({ err })
})

app.listen(port);