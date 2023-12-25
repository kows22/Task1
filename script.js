const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRegistration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({ name, email, password });

  try {
    // Save user to the database
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function handleRegistration(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Perform your registration logic here, for example, check form validity, send data to a server, etc.

  // Assuming registration is successful, redirect to the success page
  window.location.href = 'success.html';
}
