export default function AuthPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
      <h2>Authentication</h2>
      <div style={{margin: '1rem'}}>
        <a href="/auth/signin" style={{marginRight: '1.5rem', color: '#6366f1', fontWeight: 500}}>Sign In</a>
        <a href="/auth/signup" style={{color: '#6366f1', fontWeight: 500}}>Sign Up</a>
      </div>
    </div>
  );
}
