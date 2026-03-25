"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-800 to-black py-12 px-2">
      <div className="w-full max-w-xl p-8 bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow">📝 Todo List</h1>
        <Link
          href="/add-todo"
          className="inline-block mb-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
        >
          ➕ Add Todo
        </Link>
        {loading ? (
          <div className="text-gray-300 text-center">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="text-gray-400 text-center">No todos found.</div>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="p-4 bg-white/80 rounded-lg border border-gray-300 shadow hover:scale-[1.02] hover:bg-blue-50 transition-transform duration-150 text-gray-900 font-medium text-lg"
              >
                {todo.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
