require('newrelic');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('server is live');
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

let port = PORT;
if (port == null || port == '') {
  port = 3001;
}

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
