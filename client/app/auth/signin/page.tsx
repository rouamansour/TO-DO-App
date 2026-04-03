"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      // Stocker  token et rôle
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user && data.user.role) localStorage.setItem("role", data.user.role);
      router.push("/todo-list");
    } else {
      setError(data.message || "Sign in failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign In</h2>
        <label className={styles.label} htmlFor="signin-email">Email</label>
        <input
          id="signin-email"
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="signin-password">Password</label>
        <input
          id="signin-password"
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Sign In</button>
        <p className={styles.switch}>
          Don't have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
