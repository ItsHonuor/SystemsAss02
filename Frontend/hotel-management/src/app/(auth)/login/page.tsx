'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const USERS = [
  { email: 'admin@hotel.com', password: 'Admin1234!', role: 'admin' },
  { email: 'kitchen@hotel.com', password: 'Kitchen1234!', role: 'kitchen' },
  { email: 'reception@hotel.com', password: 'reception', role: 'reception' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true);
    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
      // Redirecting to the unique paths we just created in WSL
      if (user.role === 'admin') {
        router.push('/admin-dash');
      } else if (user.role === 'reception') {
        router.push('/reception-dash');
      } else if (user.role === 'kitchen') {
        router.push('/kitchen-dash');
      }
    } else {
      alert("Access Denied: Invalid Credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px]" />
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-700 rounded-[28px] shadow-[0_0_50px_rgba(59,130,246,0.3)] mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-3">Atlantica</h1>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em]">Secure Staff Portal</p>
        </div>

        <div className="bg-white/[0.06] backdrop-blur-3xl border border-white/20 rounded-[40px] p-12 shadow-2xl">
          <div className="space-y-8">
            <input
              type="email"
              placeholder="System Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-white/5 border border-white/10 text-white px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-12 w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all"
          >
            {loading ? 'Processing...' : 'Initialize Session'}
          </button>
        </div>
      </div>
    </div>
  )
}