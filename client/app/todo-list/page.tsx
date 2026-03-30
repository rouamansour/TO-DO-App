"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Todo = {
  _id: string;
  title: string;
};

export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  // Delete todo
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit todo: redirect to edit page
  const handleEdit = (id: string) => {
    router.push(`/edit-todo/${id}`);
  };

  return (
      <div className="w-full max-w-2xl p-20 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-blue-700 mx-auto mt-25">
        <div className="flex justify-center mb-8">
          <h1
            className="relative text-4xl font-extrabold text-center tracking-tight px-8 py-4 bg-gradient-to-r from-blue-700/80 via-blue-500/80 to-blue-700/80 text-white rounded-2xl shadow-xl border-4 border-blue-400/80 drop-shadow-lg"
            style={{
              letterSpacing: '0.04em',
              boxShadow: '0 6px 32px 0 rgba(30,64,175,0.18)',
            }}
          >
            <span className="inline-block align-middle mr-2">📝</span>
            <span className="align-middle">Todo List</span>
          </h1>
        </div>

        <div className="flex justify-end mb-8">
          <Link
            href="/add-todo"
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <span className="text-lg text-yellow-400">➕</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-300 text-center py-10 text-lg animate-pulse">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="text-gray-400 text-center py-10 text-lg">No todos found.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white/80 shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-700 font-bold text-lg tracking-wide">Title</th>
                  <th className="px-6 py-4 text-left text-gray-700 font-bold text-lg tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {todos.map((todo) => (
                  <tr
                    key={todo._id}
                    className="hover:bg-blue-50/70 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4 text-gray-900 font-medium text-lg group-hover:text-blue-700 transition-colors duration-200">
                      {todo.title}
                    </td>
                    <td className="px-6 py-4 flex gap-2 items-center">
                      {/* Edit */}
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150"
                        onClick={() => handleEdit(todo._id)}
                        title="Edit"
                      >
                        <span>✏️</span>
                      </button>
                      {/* Delete */}
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 font-semibold rounded-lg shadow hover:bg-red-200 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-150"
                        onClick={() => handleDelete(todo._id)}
                        title="Delete"
                      >
                        <span>❌</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
}