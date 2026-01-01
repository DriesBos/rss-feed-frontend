'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header style={{ padding: '15px', borderBottom: '2px solid #ccc', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ margin: 0 }}>RSS Reader</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>Welcome, {username}</span>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

