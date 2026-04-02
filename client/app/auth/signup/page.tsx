"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const body: any = { email, password, passwordConfirm, role };
    if (role === "admin") body.adminSecret = adminSecret;
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      // Si le backend retourne un token et un user, stocke-les (cas admin)
      if (data.token) localStorage.setItem("token", data.token);
      if (data.data && data.data.user && data.data.user.role) localStorage.setItem("role", data.data.user.role);
      router.push("/auth/signin");
    } else {
      setError(data.message || "Sign up failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>
        <label className={styles.label} htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="signup-password-confirm">Confirm Password</label>
        <input
          id="signup-password-confirm"
          className={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          required
        />

        <label className={styles.label} htmlFor="signup-role">Role</label>
        <select
          id="signup-role"
          className={styles.input}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Sign Up</button>
        <p className={styles.switch}>
          Already have an account? <a href="/auth/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}
