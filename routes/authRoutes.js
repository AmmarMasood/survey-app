const passport = require('passport');

module.exports = (app) => {
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
	  res.redirect('/surveys')//this is where we redirect user once he/she has successfully authenticate with google
});

app.get('/api/current_user', (req,res) => {
  res.send(req.user);
})
app.get('/api/logout', (req,res) => {
   req.logout();
   res.redirect('/');
})
}
