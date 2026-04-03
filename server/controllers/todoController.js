// GET /api/todos/:id
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID !!!!' });
  }
};
const Todo = require('../models/Todo');

// GET /api/todos
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 }); //Sort todos by creation date: descending order
  res.json(todos);
};


// POST /api/todos
exports.createTodo = async (req, res) => {
  const { title, priority, dueDate } = req.body;
  const todo = await Todo.create({
    title,
    priority: priority || 'Low',
    dueDate: dueDate || null,
  });
  res.status(201).json(todo);
};

// PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  const { title, completed, priority, dueDate } = req.body;
  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (completed !== undefined) updateFields.completed = completed;
  if (priority !== undefined) updateFields.priority = priority;
  if (dueDate !== undefined) updateFields.dueDate = dueDate;
  const todo = await Todo.findByIdAndUpdate(req.params.id, updateFields, {
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