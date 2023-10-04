const mongoose = require('mongoose');
const validator = require('validator');


const StudentsModel = mongoose.model('students',{
    name : {
        type : String,
        required : true,
        maxLength : 25,
        minLength : 5
    },
    email  : {
        type : String,
        required : true,
        unique : [true, "This Email is already Present"],
        validate : {
            validator : (value) => {
               return validator.isEmail(value);
            },
            message : 'Wrong email address try another email address'
        }
    },
    phoneNumber : {
        type : String,
        minLength : 10,
        maxLength : 11,
        validate : {
            validator : (num) => {
                return validator.isMobilePhone(num);
            },
            message : "Wrong phone number try another phone number"
        }
    },
    address : {
        type : String,
        required : true,
    },
    isPremium : {
        type : Boolean,
        required : true
    }
});

module.exports = {StudentsModel}; 