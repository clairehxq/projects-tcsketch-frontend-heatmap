const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// serve static files
app.use(express.static('public'));

// Listening to the port provided
app.listen(port, () => {
  console.log('App listening at port ' + port)
});
