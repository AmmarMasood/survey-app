const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({this: "should work omg!"});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);
