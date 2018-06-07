const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({hi: "thesre"})
})
const POST = process.env.PORT || 5000;
app.listen(PORT);
