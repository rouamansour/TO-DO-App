"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority?: string;
  dueDate?: string;
};


export default function TodoPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/todos", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        alert("You are not authorized to delete this todo.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDone = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ completed: true }),
      });
      if (res.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [editError, setEditError] = useState<string | null>(null);
  const handleEdit = (id: string) => {
    const todo = todos.find((t) => t._id === id);
    if (todo?.completed) {
      setEditError("You can't edit a completed task");
      setTimeout(() => setEditError(null), 2000);
      return;
    }
    router.push(`/edit-todo/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-2">
      {editError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-center font-semibold shadow-sm w-full max-w-xl">
          {editError}
        </div>
      )}
      <header className="w-full max-w-xl flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-2">
          <span className="text-blue-600">📝</span>
          <span>Todo List</span>
        </h1>
        <div className="flex justify-end w-full">
          <Link
            href="/add-todo"
            className="mt-2 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <span className="text-lg">➕</span>
          </Link>
        </div>
      </header>

      <section className="w-full max-w-xl">
        {loading ? (
          <div className="text-gray-400 text-center py-10 text-lg animate-pulse">
            Loading...
          </div>
        ) : todos.length === 0 ? (
          <div className="text-gray-400 text-center py-10 text-lg">
            No todos found.
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 ${todo.completed ? "opacity-60" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                    >
                      {todo.title}
                    </span>
                    {todo.completed && (
                      <span className="text-green-500" title="Done">
                        ✔️
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium text-gray-700">
                        Priority:
                      </span>{" "}
                      {todo.priority || "Low"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="font-medium text-gray-700">Due:</span>{" "}
                      {todo.dueDate
                        ? new Date(todo.dueDate).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {!todo.completed && (
                    <button
                      className="px-3 py-1 bg-green-50 text-green-700 font-medium rounded-lg border border-green-200 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-150"
                      onClick={() => handleDone(todo._id)}
                      title="Mark as done"
                    >
                      ✔️
                    </button>
                  )}
                  {!todo.completed && (
                    <button
                      className="px-3 py-1 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150"
                      onClick={() => handleEdit(todo._id)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                  )}
                  {role === "admin" && (
                    <button
                      className="px-3 py-1 bg-red-50 text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-150"
                      onClick={() => handleDelete(todo._id)}
                      title="Delete"
                    >
                      ❌
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
