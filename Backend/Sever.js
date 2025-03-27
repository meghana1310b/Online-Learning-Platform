const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/learning-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Course Model
const Course = mongoose.model('Course', new mongoose.Schema({
  title: String,
  description: String,
  image: String
}));

// Routes
app.get('/', (req, res) => res.send('Backend is running...'));

app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
