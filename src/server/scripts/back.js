// back.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Post = require('../util/postSchema'); // Import the post schema

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB using the provided connection string
mongoose.connect('mongodb://localhost:27017/AtlasVenture', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/api/create-post', async (req, res) => {
  const { title, content, label, creator } = req.body;

  try {
    const newPost = new Post({ title, content, label, creator });
    await newPost.save();
    console.log('New post saved to the database.');
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error saving post to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/posts/:section', async (req, res) => {
  const { section } = req.params;

  try {
    const posts = await Post.find({ label: section }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching section-specific posts' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
