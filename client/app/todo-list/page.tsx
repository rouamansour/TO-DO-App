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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-800 to-black py-12 px-2">
      <div className="w-full max-w-xl p-8 bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow">
          📝 Todo List
        </h1>

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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/80 rounded-lg border border-gray-300 shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {todos.map((todo) => (
                  <tr
                    key={todo._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 border-b border-gray-200 text-gray-900 font-medium text-lg">
                      {todo.title}
                    </td>

                    <td className="px-4 py-3 border-b border-gray-200">
                      {/* Edit */}
                      <button
                        className="mr-3 text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(todo._id)}
                      >
                        ✏️
                      </button>

                      {/* Delete */}
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(todo._id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}