const Joi = require('joi');



// Schema of what is expected in the registration form
const schemaUserInput = Joi.object({
    email:Joi.string().email().required(),
    nickname:Joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9_-]{2,14}$')).required(),
    password:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required(),
    confirmation:Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$')).required()
}).required();

/* The regular expression above checks that a password:
Consists of a minimum of 8 characters, at least one uppercase letter, at least one lowercase letter,
At least one digit, and at least one special character." */

const validationService = {

    checkForm(req, res, next){
         const {error} = schemaUserInput.validate(req.body)
        
        if(!error){
            next()
        }
        else{
            
            res.json(error.details[0].message)
        }
    }

}

module.exports = validationService;