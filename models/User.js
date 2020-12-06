const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a password']
        
    },
    password:{
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'Minimun length is 6 characters'],
    }
})


userSchema.post('save', function (doc,next) {
    console.log('new user was created and saved', doc);
    next();
})

userSchema.pre('save', async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
    next();
});
const User = mongoose.model('user', userSchema)

module.exports = User;