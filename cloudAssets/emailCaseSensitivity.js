function validate(callback,event,email){
   
        if (email.match(/[A-Z]+/) ) {
            console.log('upper case true');
            callback(new Error("Email address MUST be lower case"));
            
        } else {
            console.log('lower case true');
            callback(null, event);
        }
 
      
    
}
exports.handler = (event, context, callback) => {
   console.log(event)

   if (typeof event.triggerSource != 'undefined'){
    if ("UserMigration_Authentication"===event.triggerSource){
        validate(callback,event,event.userName)
    }
    else if ("PreSignUp_SignUp"===event.triggerSource){
        validate(callback,event,event.request.userAttributes.email)
    }
    else if ("PreAuthentication_Authentication"===event.triggerSource){
        validate(callback,event,event.request.userAttributes.email)
    }
   else{
       callback(new Error("Cannot validate email address"));
   }
   }
};