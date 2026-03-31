"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, passwordConfirm, role }),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/auth/signin");
    } else {
      setError(data.message || "Sign up failed");
    }
  };

  return (
    <div className={styles.container}>
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
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Sign Up</button>
        <p className={styles.switch}>
          Already have an account? <a href="/auth/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}
