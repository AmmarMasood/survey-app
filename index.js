const express = require('express');
require('./models/User.js');
require('./models/Surveys.js');
require('./services/passport.js');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
//this app's wont show any new surveys in developemnt because we have changed our sendgrid webhooks address
//to our heroku deployed application.
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);
require('./routes/surveyRoutes.js')(app);

if(process.env.NODE_ENV === "production"){
app.use(express.static('client/build')); 

const path = require('path');
app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
