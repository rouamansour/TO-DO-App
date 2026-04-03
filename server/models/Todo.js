const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true } //add createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('Todo', todoSchema);