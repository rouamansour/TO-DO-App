"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTodo() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setPriority(data.priority || "Low");
        setDueDate(data.dueDate ? data.dueDate.slice(0, 10) : "");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load todo");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, priority, dueDate: dueDate || null }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      router.push("/todo-list");
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center text-gray-400 text-lg animate-pulse">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-2">
      <section className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-8 text-center flex items-center gap-2 justify-center">
          <span className="text-blue-600">✏️</span>
          <span>Edit Todo</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-7">
          <input
            className="w-full px-5 py-4 rounded-lg border border-gray-300 bg-white text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-sm transition-all duration-200"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit todo title"
            required
            disabled={loading}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700">Priority</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                disabled={loading}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700">Due Date</label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50 text-lg"
            disabled={loading}
          >
            <span className="text-xl">✏️</span>
            {loading ? "Saving..." : "Save Todo"}
          </button>
          {error && <div className="text-red-500 text-center font-medium">{error}</div>}
        </form>
      </section>
    </main>
  );
}

