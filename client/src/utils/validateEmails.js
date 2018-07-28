const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
const invalidEmails = emails
   .split(',')
   .map(email => email.trim())
   .filter(email => re.test(email) === false) //we put ===false so that we can return value where the 
                                          //email does not pass the test
if(invalidEmails.length){
	return `These emails are invalid: ${invalidEmails}`;
}
return null;
};