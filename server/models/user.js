var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: {true: "Name field must be filled out" },
        trim: true,
    },
    email: {
        type: String,
        required: {true: "Must enter a valid email"},
        minlength: [5, "Email must be at least 5 characters"],
        maxlength: [40, "Email can be no longer than 40 characters"],
        unique: [true, "Email already registered. Please log in or use different email."],
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email not valid format. Please try again."]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32,
        validate: {
          validator: function( value ) {
            return /^([a-zA-Z0-9@*#]{8,15})$/.test( value );
          },
          message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    }},
    {timestamps: { createdAt: 'createdAt', updatedAt: 'updated_at'} });
var User = mongoose.model('User', UserSchema);