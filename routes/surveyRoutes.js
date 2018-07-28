const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');//yes we didnt install it's a built in nodejs module, it has different---
const mongoose = require('mongoose'); //---helpers on it, helping us parse URL inside the app
const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const surveyTemplates = require('../services/emailTemplates/surveyTemplates.js');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');

module.exports = app => {
//it shows all the surveys created by the user
app.get('/api/surveys', requireLogin, async (req,res) => {

   const surveys = await Survey.find({_user: req.user.id})
       .select({recipients: false}); //it is a mongoose query,it says to do not include recepients from the 
    res.send(surveys);               //survey we found above we can also make it recepient: true so we will only get
})                                 //the recepients list.

//we made this route handler so we can redirect the recipient to some kind of thankyou page:
app.get('/api/surveys/:surveyId/:choice', (req,res) => {
	res.send('Thanks for voting ;)');
})

 //it gets data send by send-grid webhook
app.post('/api/surveys/webhooks', (req,res) => {
   
const p = new Path('/api/surveys/:surveyId/:choice'); //in here we are using the path-parser library and giveing it a route and then extracting the surveyId and Choice out of it.
 _.chain(req.body)
  .map((event) => {
  const match = p.test(new URL(event.url).pathname) //so we are using path-parser to extract what we need from the events.url
  console.log(match.choice);
  if(match){
     return {
        email: event.email,
        surveyId: match.surveyId,
        choice: match.choice
     }
  }
}) 
.compact()
.uniqBy('email', 'surveyId')
//since the map we did above return array we can again use "each" helper with chain and update mongodb
.each(({surveyId, email, choice}) => {    //this is all event.surveyId,event.email,event.choice
   if (choice === 'Yes') {
     Survey.updateOne( //instead of using if/else there is a better way of doing this checkout mongoose_queries.js
     {                 //to find a better version of this code unfortunaly which does'nt work in current mongoose -v
        _id: surveyId,
        recipients: {
        $elemMatch: {email: email, responded: false}
        }
     }, {
        $inc: { 'yes': 1 },
        $set: {'recipients.$.responded': true},
        lastRespond: new Date()  //gives last-responded property === recent date
     }).exec();}
              else{
             Survey.updateOne(
             {
                _id: surveyId,
                recipients: {
                $elemMatch: {email: email, responded: false}
                }
             }, {
                $inc: { 'no': 1 },
                $set: {'recipients.$.responded': true},
                lastRespond: new Date()  
             }).exec();}

  })
  .value(); //this is for pulling out the value after all process
  
  res.send({})
});

//it receives the form data from front-end and save it to mongooose
app.post('/api/surveys', requireLogin, requireCredit, async (req,res) => {
const {title, subject, body, recipients} = req.body;
const survey = new Survey({
  title: title,
  subject: subject,
  body: body,
  recipients: recipients.split(',').map((email) => {return {email: email.trim()} }),
  _user: req.user.id, 
  dateSent: Date.now() //this is the date rightnow.
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