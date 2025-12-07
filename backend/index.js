const express = require('express');
const cors = require('cors');
const path = require('path')
const passport = require('passport');
require('./config/passport')(passport);
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3002;
app.use(cors());
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = require('./routes/foRoutes')

const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use('/', router);

app.listen(port, () => {
    console.log(`Server started on port ${port}. Ctrl^c to quit.`)
})