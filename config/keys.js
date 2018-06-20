//keys.js figure out what set of credentials are goingt to return:
if(process.env.NODE_ENV === "production"){
  //we are in production - return prod set of keys
   module.exports = require('./prod.js'); // so we can get keys from prod.js and export it to other part of the app.
}else{
  //we are in development - return dev keys
module.exports = require('./dev.js'); // we do this by requireing dev.js first then immediately exporting so we dont have to
                                         //change anything in other part of the app.
}
