const keys = require('../../config/keys');

module.exports = (survey) => {
	return `
        <html>
        <body>
        <div style="text-align: center;">
             <h3>I'd Like your Input!</h3>
             <p>Please answer the following question:</p>
             <p>${survey.body}</p>
             <div><a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a></div>
             <div><a href="${keys.redirectDomain}/api/surveys/thanks">No</a></div>
        </div>
        </body>
        </html>
	`;
	//we cannot use relative links in a-tags in prod because using "/" will only take to the relative path of
	//the gmail or any current website they are on, so we have solved this by saving the address in keys then
	//we can detemine which address to send user too
};