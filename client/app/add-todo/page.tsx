"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodo() {
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const res = await fetch("http://localhost:5000/api/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title }),
			});
			if (!res.ok) throw new Error("Failed to add todo");
			setTitle("");
			router.push("/todo-list");
		} catch (err: any) {
			setError(err.message || "Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-2">
			<div className="w-full max-w-xl p-8 bg-white/10 backdrop-blur rounded-2xl shadow-2xl border border-gray-700">
				<h1 className="text-3xl font-extrabold mb-6 text-white drop-shadow">➕ Add Todo</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<input
						className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/80 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 shadow"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter todo title"
						required
						disabled={loading}
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 text-lg"
						disabled={loading}
					>
						{loading ? "Adding..." : "Add Todo"}
					</button>
					{error && <div className="text-red-400 text-center font-medium">{error}</div>}
				</form>
			</div>
		</div>
	);
}
