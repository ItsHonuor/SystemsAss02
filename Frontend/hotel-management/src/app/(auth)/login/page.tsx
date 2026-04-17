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
    setLoading(true)
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password)
      if (user) router.push(`/${user.role}/dashboard`)
      else {
        setLoading(false)
        alert("Access Denied")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden font-sans">
      
      {/* 1. LARGER AMBIENT GLOWS */}
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-500/15 rounded-full blur-[160px]" />

      <div className="relative z-10 w-full max-w-lg px-6">
        
        {/* 2. ENHANCED BRANDING */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-700 rounded-[28px] shadow-[0_0_50px_rgba(59,130,246,0.5)] mb-8">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-3">Atlantica</h1>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.5em] opacity-80">Internal Systems Portal</p>
        </div>

        {/* 3. LARGER & BRIGHTER CARD */}
        <div className="bg-white/[0.06] backdrop-blur-3xl border border-white/20 rounded-[40px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Staff Authentication</h2>
            <p className="text-slate-400 text-sm mt-2">Access restricted to authorized personnel.</p>
          </div>

          <div className="space-y-8">
            <div className="group">
              <label className="text-blue-400 text-[11px] font-black uppercase tracking-widest mb-3 block ml-1">System ID / Email</label>
              <input
                type="email"
                placeholder="staff@atlantica.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white text-lg placeholder-slate-600 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
            
            <div className="group">
              <label className="text-blue-400 text-[11px] font-black uppercase tracking-widest mb-3 block ml-1">Secure Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full bg-white/5 border border-white/10 text-white text-lg placeholder-slate-600 px-6 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-12 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-2xl transition-all duration-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)] active:scale-[0.98] flex items-center justify-center gap-4"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'start session'}
          </button>
        </div>

        {/* 4. SYSTEM FOOTER */}
        <div className="mt-10 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            </p>
        </div>
      </div>
    </div>
  )
}