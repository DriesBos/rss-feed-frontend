'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { freshRSSAPI } from '@/lib/freshrss-api';

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authToken = await freshRSSAPI.login(username, password);
      
      // Store auth token in localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('username', username);
      
      // Redirect to home page
      router.push('/');
    } catch (err) {
      setError(isSignup ? 'Failed to create account' : 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>{isSignup ? 'Create Account' : 'Login'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px' }}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Login')}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => {
            setIsSignup(!isSignup);
            setError('');
          }}
          style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}>
        <h3>Note:</h3>
        <p style={{ fontSize: '14px' }}>
          This connects to your FreshRSS backend. Make sure your FreshRSS instance is running and accessible.
          {isSignup && ' To create a new user, you\'ll need to set up the account in FreshRSS first.'}
        </p>
      </div>
    </div>
  );
}

