const Joi = require('joi');



// Schema of what is expected in the registration form
const schemaUserSignup = Joi.object({
    email:Joi.string().email().required(),
    nickname:Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{2,14}$')).required(),
    password:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required()
}).required();

/* The regular expression above checks that a password:
Consists of a minimum of 8 characters, at least one uppercase letter, at least one lowercase letter,
At least one digit, and at least one special character." */

// Schema of what is expected in the login form
const schemaUserLogin = Joi.object({
    nickname:Joi.string().required(),
    password:Joi.string().required()
}).required();

// Schema of what is expected in the change password form
const schemaUserNewPassword = Joi.object({
    currentPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    newPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required()
}).required();

// Schema of what is expected in the forgotten password form
const schemaUserForgottenPassword = Joi.object({
    newPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    token:Joi.string().required()
}).required();

//
const schemaForgottenPasswordMailInput = Joi.object({
    email:Joi.string().email().required(),
}).required();



const validationService = {
    // Middleware to validate user input during the sign-up process
    // Using Joi schema (schemaUserSignup) to perform the validation.
    checkSignUpForm(req, res, next){
        const {error} = schemaUserSignup.validate(req.body);
        
        if(!error){
            next();
        }
        else{
            
            res.json({message: error.details[0].message, status: "Error"});
        }
    },
    
    // Middleware to validate user input during the login process
    // Using Joi schema (schemaUserLogin) to perform the validation.
    checkLoginForm(req, res, next){
        const {error} = schemaUserLogin.validate(req.body);
        
        if(!error){
            next();
        }
        else{
            
            res.json({message: error.details[0].message, status: "Error"});
        }
        
    },
    
    // Middleware to validate user input during the password change process
    // Using Joi schema (schemaUserNewPassword) to perform the validation.
    checkNewPasswordForm(req, res, next){
        const {error} = schemaUserNewPassword.validate(req.body);
        
        if(!error){
            next();
        }
        else{
            
            res.json({message: error.details[0].message, status: "Error"});
        }
        
    },
    
    // Middleware to validate user input during the forgotten password reset process
    // Using Joi schema (schemaUserForgottenPassword) to perform the validation.
    checkForgottenPasswordForm(req, res, next){
        const {error} = schemaUserForgottenPassword.validate(req.body);
        
        if(!error){
            next();
        }
        else{
            
            res.json({message: error.details[0].message, status: "Error"});
        }
        
    },
    // Middleware to validate user input during the request of a reset password mail in the the forgotten password reset process
    // Using Joi schema (schemaForgottenPasswordMailInput) to perform the validation.
    checkForgottenPasswordMailInput(req, res, next){
        const {error} = schemaForgottenPasswordMailInput.validate(req.body);
        
        if(!error){
            next();
        }
        else{
            
            res.json({message: error.details[0].message, status: "Error"});
        }
        
    },
};

module.exports = validationService;