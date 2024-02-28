const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// let invalidRequestCount = 0;
// const trackInvalidRequests = (req, res, next) => {
//   if (req.path === '/signup' && req.method === 'GET') {
//     invalidRequestCount++;
//     console.log(`${invalidRequestCount}`);
//     // res.status(400).send('<html><body><h1>Invalid request method - ' + invalidRequestCount + '</h1></body></html>');

//   } else {
//     next();
//   }
// };
// app.use(trackInvalidRequests);

// Endpoint to serve signup page
app.get('/signup', (req, res) => {
  res.send(`
    <form action="/signup" method="post">
      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name"><br>
      <label for="gender">Gender:</label><br>
      <input type="text" id="gender" name="gender"><br>
      <label for="age">Age:</label><br>
      <input type="number" id="age" name="age"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Endpoint to handle signup form submission
app.post('/signup', (req, res) => {
  const { name, gender, age } = req.body;
  const user = { name, gender, age };
  const userData = JSON.stringify(user);

  fs.appendFile('user.json', userData + '\n', (err) => {
    if (err) throw err;
    console.log('User data appended to users.txt');
  });

  res.send('Signup successful!');``
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


