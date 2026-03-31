import styles from "../navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles["navbar-logo"]}>
        <span style={{marginRight: '0.5rem', fontSize: '1.3em', verticalAlign: 'middle'}}>📝</span>
        TO-DO App
      </a>
      <div className={styles["navbar-links"]}>
        <a href="/todo-list" className={styles["navbar-link"]}>
          <span style={{marginRight: '0.4rem', fontSize: '1.1em', verticalAlign: 'middle'}}>📋</span>
          Todo List
        </a>
        <a href="/add-todo" className={styles["navbar-link"]}>
          <span style={{marginRight: '0.4rem', fontSize: '1.1em', verticalAlign: 'middle'}}>➕</span>
          Add Todo
        </a>
        {/* <a href="/auth/signin" className={styles["navbar-link"]}>
          <span style={{marginRight: '0.4rem', fontSize: '1.1em', verticalAlign: 'middle'}}>🔑</span>
          Sign In
        </a>
        <a href="/auth/signup" className={styles["navbar-link"]}>
          <span style={{marginRight: '0.4rem', fontSize: '1.1em', verticalAlign: 'middle'}}>🧑‍💻</span>
          Sign Up
        </a> */}
        <a href="/auth/logout" className={styles["navbar-link"]}>
          <span style={{marginRight: '0.4rem', fontSize: '1.1em', verticalAlign: 'middle'}}>🔓</span>
          Logout
        </a>
      </div>
    </nav>
  );
}
