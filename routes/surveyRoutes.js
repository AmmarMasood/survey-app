const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const surveyTemplates = require('../services/emailTemplates/surveyTemplates.js');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');

module.exports = app => {
 //we made this route handler so we can redirect the recipient to some kind of thankyou page:
 app.get('/api/surveys/thanks', (req,res) => {
 	res.send('Thanks for voting ;)');
 })
 app.post('/api/surveys', requireLogin, requireCredit, async (req,res) => {
 	const {title, subject, body, recipients} = req.body;
 	const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map((email) => {return {email: email.trim()} }),
      _user: req.user.id, 
      sentDate: Date.now() //this is the date rightnow.
 	});
 	//this is from email is send
 	const mailer =  new Mailer(survey, surveyTemplates(survey));
 	try{ //we are wrapping our await request with try-catch so that we can catch some erros
 	  await mailer.send();
 	  await survey.save();//this is where we saved the survey of the user
      req.user.credits -= 1; //we subtracted the credit from user
      const user = await req.user.save() // this is where we save the user and then return the updated value of user
 	   res.send(user); //we send the user back because we want to update the value of our header too, just
 	// like we did in when we updated the credits.
   } catch(err){
       res.status(422).send(err)
 }
 	 })
};