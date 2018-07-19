const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema = require('./Recipient.js')

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],//this is an array of sub-document model we required and defined in
    //Recipent.js	
	yes: {type: Number, default: 0},
	no:  {type: Number, default: 0},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}, //Schema.Type.ObjectId == the object id that is inside every user
	//provided by the mongoose. and the ref=== is the name of the User model, so this whole statement connects the User
	// model to the survey model via the object id provided by the mongoose in user model.
    dateSent: Date, //it tells us when the survey was sent
    lastRespond: Date  //it tells us when the reciepient responded that might be a week ago
})

mongoose.model('surveys', surveySchema)
