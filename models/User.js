const mongoose = require('mongoose');
const {Schema} =  mongoose;
// the above and this line is same: const Schema = mongoose.Schema;
  const userSchema = new Schema({
    googleId: String,
    displayName: String,
    credits: {type: Number, default: 0} //we create object when we need to pass more then one value to some
  })                                    //property.
  mongoose.model('users', userSchema);
