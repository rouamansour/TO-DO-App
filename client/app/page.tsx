
"use client";
import { useEffect, useState } from "react";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletedCount, setDeletedCount] = useState<number>(0);

  useEffect(() => {
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

    // Get deleted count from localStorage (simulate, since no API for deleted)
    const deleted = localStorage.getItem("deletedCount");
    setDeletedCount(deleted ? parseInt(deleted, 10) : 0);
  }, []);

  // Calculate stats
  const totalTasks = todos.length + deletedCount;
  const doneTasks = todos.filter((t) => t.completed).length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex-col items-center justify-center py-20 px-4 sm:items-start">
        <h1 className="text-3xl font-bold mb-8 text-blue-700">Welcome to your Todo Dashboard</h1>
        {loading ? (
          <div className="text-gray-400 text-center py-10 text-lg animate-pulse">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center bg-blue-50 rounded-xl shadow p-8">
              <span className="text-5xl font-bold text-blue-600 mb-2">{totalTasks}</span>
              <span className="text-lg font-medium text-blue-900">All Tasks</span>
            </div>
            <div className="flex flex-col items-center bg-green-50 rounded-xl shadow p-8">
              <span className="text-5xl font-bold text-green-600 mb-2">{doneTasks}</span>
              <span className="text-lg font-medium text-green-900">Tasks Done</span>
            </div>
            <div className="flex flex-col items-center bg-red-50 rounded-xl shadow p-8">
              <span className="text-5xl font-bold text-red-600 mb-2">{deletedCount}</span>
              <span className="text-lg font-medium text-red-900">Tasks Deleted</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
