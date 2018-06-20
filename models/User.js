const mongoose = require('mongoose');
const {Schema} =  mongoose;
// the above and this line is same: const Schema = mongoose.Schema;
  const userSchema = new Schema({
    googleId: String
  })
  mongoose.model('users', userSchema);
