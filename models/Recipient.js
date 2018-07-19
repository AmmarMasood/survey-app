const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: {type: Boolean, default: false} //this responded tells us wheather the user has clicked on
	//yes or no... if they have clicked on anyone of the following this false will become true(we do that
	//later) so user cannot respond again.
})
module.exports = recipientSchema