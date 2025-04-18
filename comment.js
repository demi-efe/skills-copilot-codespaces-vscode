// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'test';
const collectionName = 'comments';
const db = client.db(dbName);
const collection = db.collection(collectionName);
const { ObjectId } = require('mongodb');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});
// Define the Comment schema
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
}, { timestamps: true });
// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);
// Create a new comment
app.post('/comments', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Get a single comment by ID
app.get('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error fetching comment', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update a comment by ID
app.put('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error updating comment', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.close();
  }
}
);
// Delete a comment by ID
app.delete('/comments/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Export the app for testing
module.exports = app;
// Export the MongoDB client for testing
module.exports.client = client;
// Export the MongoDB collection for testing
module.exports.collection = collection;
// Export the MongoDB database for testing
module.exports.db = db;
// Export the MongoDB ObjectId for testing
module.exports.ObjectId = ObjectId;
// Export the MongoDB URI for testing
module.exports.uri = uri;
// Export the MongoDB database name for testing
module.exports.dbName = dbName;
// Export the MongoDB collection name for testing
module.exports.collectionName = collectionName;
// Export the MongoDB comment schema for testing
module.exports.commentSchema = commentSchema;
// Export the MongoDB comment model for testing
module.exports.Comment = Comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing
module.exports.comment = comment;
// Export the MongoDB comment object for testing   

