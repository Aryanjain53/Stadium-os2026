"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Store users persistently in localStorage
  const [registeredUsers, setRegisteredUsers] = useState({
    'admin': '12345',
    'bipul': '12345'
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem('stadiumOSUsers');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('stadiumOSUsers', JSON.stringify(registeredUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (registeredUsers[username] && registeredUsers[username] === password) {
        if (username === 'admin') router.push('/admin');
        else router.push('/user');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } else {
      if (!username || !password) {
        setError('Please enter a username and password.');
        return;
      }
      if (registeredUsers[username]) {
        setError('Username already exists.');
        return;
      }
      
      const newUsers = { ...registeredUsers, [username]: password };
      setRegisteredUsers(newUsers);
      localStorage.setItem('stadiumOSUsers', JSON.stringify(newUsers));
      
      // Auto-login to fan portal for new accounts
      router.push('/user');
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      height: '100vh', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)', fontFamily: 'Orbitron' }}>STADIUM OS</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--text-muted)' }}>Secure Access Portal</p>
      
      <form onSubmit={handleSubmit} className="glass-panel" style={{
        display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px', padding: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          {isLogin ? 'LOGIN' : 'REGISTER'}
        </h2>

        {error && (
          <div style={{ padding: '10px', background: 'rgba(255, 51, 102, 0.1)', border: '1px solid var(--status-danger)', borderRadius: '6px', color: 'var(--status-danger)', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <User size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(0,0,0,0.4)', 
              border: '1px solid var(--panel-border)', borderRadius: '6px', color: 'var(--text-main)',
              fontSize: '1rem', outline: 'none'
            }}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <Lock size={20} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%', padding: '12px 12px 12px 40px', background: 'rgba(0,0,0,0.4)', 
              border: '1px solid var(--panel-border)', borderRadius: '6px', color: 'var(--text-main)',
              fontSize: '1rem', outline: 'none'
            }}
          />
        </div>

        <button type="submit" style={{
          marginTop: '1rem', padding: '14px', background: 'rgba(0, 240, 255, 0.15)', 
          color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)', borderRadius: '6px',
          fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease',
          boxShadow: 'var(--glow-shadow)'
        }}>
          {isLogin ? 'AUTHENTICATE' : 'CREATE ACCOUNT'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setUsername(''); setPassword(''); }} style={{
            background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
            textDecoration: 'underline', fontSize: '0.9rem'
          }}>
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
