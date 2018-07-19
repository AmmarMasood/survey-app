const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail{
	constructor({subject, recipients}, content){
      super();

      this.sgApi = sendgrid(keys.sendGridKey); //this is how we are sending our mailer to sendGrid with the api key.
      //when we call the sendgrid() it is going to give us object back which is saved in sgApi we send the 
      //request down below using send()
      this.from_email = new helper.Email('dont-reply@gmail.com');
      this.subject = subject;
      this.body = new helper.Content('text/html', content);
      this.recipients = this.formatAddresses(recipients);
  //now only creating this.body is not enough we need to make it as a actual content to the mail
  //this addContent() is provided by helper.Mail
  this.addContent(this.body);
  //this is something we have to do to keep track of yes or no link we added 
  this.addClickTracking();
 //this is the fucntion we define to take and process the list of resipients 
  this.addRecipients();
	}
	    formatAddresses(recipients){
		return recipients.map(({email}) => {
			return new helper.Email(email);
		}) //we created this formatAddresses so that we can add all the emails to helper.Email.
	}

	addClickTracking(){
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients(){
		const personalize = new helper.Personalization();
		this.recipients.forEach(recipient =>{   //it is the list of recepients we define above
			personalize.addTo(recipient)
		});
		this.addPersonalization(personalize);
	}
	async send(){
		const request = this.sgApi.emptyRequest({
			method: "POST",
			path: '/v3/mail/send',
			body: this.toJSON() //this.toJSON() is provided by the sendGrid
		});
     const response = await this.sgApi.API(request);  //this is what actually send the request to api
	  return response;
	}
}
module.exports = Mailer;