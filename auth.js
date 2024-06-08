let passport = require('passport');
const staff = require('./models/staff.js');
let localStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');

passport.use(new localStrategy( {usernameField: 'email'}, async function(username, password, done){
    
    try{
        //import the staff model
        let staffData = require('./models/staff.js');

        //authentication logic
        //get the whole document using email
        let auth_document = await staffData.findOne({email: username});
        if(!auth_document) {throw new Error("User Not Found");}

        //check the email
        let auth_email = auth_document.email;
        if(!auth_email){throw new Error("Email Not Found");}

        //check the password
        let auth_pass = await bcrypt.compare(password, auth_document.password);
        if(!auth_pass){throw new Error("Incorrect Password");}

        return done(null, auth_document);
    }
    catch(error){
        return done(error);
    }
   
}))

module.exports = passport;