// postSchema.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  label: { type: String, enum: ['General', 'Accommodation', 'Food'], required: true },
  creator: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
