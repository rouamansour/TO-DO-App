"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTodo() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/todos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
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
        body: JSON.stringify({ title }),
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
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-2">
      <div className="w-full max-w-xl p-8 bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow">
          ✏️ Edit Todo
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 text-gray-900 text-lg"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Edit todo title"
            required
            disabled={loading}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Todo"}
          </button>

          {error && (
            <div className="text-red-400 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}