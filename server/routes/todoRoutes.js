const express = require('express');
const router = express.Router();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');
const { protect, authorize } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.get('/', protect, getTodos);
router.get('/:id', protect, getTodoById);
router.post('/', protect, authorize('user', 'admin'), createTodo);
router.put('/:id', protect, authorize('user', 'admin'), updateTodo);

router.delete('/:id', protect, authorize('admin'), deleteTodo);

module.exports = router;