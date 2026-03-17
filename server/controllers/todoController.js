const Todo = require('../models/Todo');

// GET /api/todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// POST /api/todos
exports.createTodo = async (req, res) => {
  const todo = await Todo.create({ title: req.body.title });
  res.status(201).json(todo);
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Todo deleted' });
};