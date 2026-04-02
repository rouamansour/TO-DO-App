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
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br via-white">
        <div className="text-center text-gray-300 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

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
            <span className="inline-block align-middle mr-2">✏️</span>
            <span className="align-middle">Edit Todo</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input
            className="w-full px-5 py-4 rounded-xl border border-gray-300 bg-white/80 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow-lg transition-all duration-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-200"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-200"
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50 text-lg"
            disabled={loading}
          >
            <span className="text-xl">✏️</span>
            {loading ? "Saving..." : "Save Todo"}
          </button>
          {error && <div className="text-red-400 text-center font-medium">{error}</div>}
        </form>
    </div>
  );
}