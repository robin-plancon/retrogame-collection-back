const Joi = require('joi');



// Schema of what is expected in the registration form
// - email: must be a valid email address.
// - nickname: must start with a letter and can contain letters, numbers, underscores, and hyphens. Length between 3 and 15 characters.
// - password: must be 8-14 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
const schemaUserSignup = Joi.object({
    email:Joi.string().email().required(),
    nickname:Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{2,14}$')).required(),
    password:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required()
}).required();

// Schema of what is expected in the login form
// - nickname: must start with a letter and can contain letters, numbers, underscores, and hyphens. Length between 3 and 15 characters.
// - password: must be 8-14 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
const schemaUserLogin = Joi.object({
    nickname:Joi.string().required(),
    password:Joi.string().required()
}).required();

// Schema of what is expected in the change password form
// - currentPassword: must be 8-14 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
// - newPassword: must be 8-14 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
const schemaUserNewPassword = Joi.object({
    currentPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    newPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required()
}).required();

// Schema of what is expected in the forgotten password form
// - newPassword: must be 8-14 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
// - token: required for password reset
const schemaUserForgottenPassword = Joi.object({
    newPassword:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    token:Joi.string().required()
}).required();

// Schema for forgotten password email input
// - email: must be a valid email address.
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