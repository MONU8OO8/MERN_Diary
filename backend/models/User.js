const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
   Name: {type: String,
          require: true
   },
   email: {
    type: String,
    require: true,
   //  index: { unique: true, sparse: true }
   unique: true
   },
   password: {
    type: String,
    require: true
   },
   date:  {
    type: Date,
    default: Date.now
   },
});

const User = mongoose.model('user', UserSchema);

// User.createIndexes();

module.exports = User;