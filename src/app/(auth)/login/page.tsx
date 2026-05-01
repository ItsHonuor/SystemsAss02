"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User, X } from "lucide-react";

export default function UserAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"choose" | "signin" | "signup">("choose");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sign in form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign up form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const { signIn, getSession } = await import("next-auth/react");

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("❌ Sign-in failed:", result.error);
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      console.log("✅ signIn successful");

      // Small delay to let NextAuth update the session
      await new Promise(resolve => setTimeout(resolve, 800));

      const session = await getSession();
      console.log("📋 Full session after login:", session);

      const role = (session?.user as any)?.role;
      console.log("🔑 Detected role:", role);

      if (role === "Admin") {
        router.push("/admin-portal");
      } else if (role === "Receptionist") {
        router.push("/reception-dash");
      } else if (role === "Housekeeping") {
        router.push("/housekeeping-dash");
      } else if (role === "Kitchen Staff") {
        router.push("/kitchen-dash");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error("🚨 Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed.");
      } else {
        const { signIn } = await import("next-auth/react");
        await signIn("credentials", {
          email: signupEmail,
          password: signupPassword,
          redirect: false,
        });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all bg-gray-50";
  const labelClass = "block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5";

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}
    >
      <img
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Atlantica"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 w-full max-w-[420px]">
        <p className="text-center text-white font-black text-xl tracking-tighter uppercase mb-8">Atlantica</p>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden">
          {mode === "choose" && (
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-[26px] font-black tracking-tight text-gray-900">Before you book</h1>
                  <p className="text-gray-400 text-sm mt-1.5">Sign in or continue as a guest</p>
                </div>
                <button onClick={() => router.push("/")} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-300 hover:text-gray-500">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                <button onClick={() => setMode("signin")} className="w-full bg-black text-white rounded-[20px] px-6 py-5 flex items-center justify-between group hover:bg-zinc-800 transition-all">
                  <div className="text-left">
                    <p className="font-black text-sm uppercase tracking-widest">Sign In</p>
                    <p className="text-gray-400 text-xs font-normal normal-case tracking-normal mt-0.5">Save your booking & earn rewards</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                </button>

                <button onClick={() => router.push("/")} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-[20px] px-6 py-5 flex items-center justify-between group hover:bg-gray-100 transition-all">
                  <div className="text-left">
                    <p className="font-black text-sm uppercase tracking-widest">Continue as Guest</p>
                    <p className="text-gray-400 text-xs font-normal normal-case tracking-normal mt-0.5">No account needed</p>
                  </div>
                  <User size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <p className="text-center text-gray-400 text-sm mt-8">
                Don&apos;t have an account?{" "}
                <button onClick={() => setMode("signup")} className="text-black font-black hover:underline">Create one</button>
              </p>
            </div>
          )}

          {mode === "signin" && (
            <div className="p-10">
              <button onClick={() => { setMode("choose"); setError(""); }} className="text-gray-400 hover:text-gray-600 text-[10px] font-black uppercase tracking-widest mb-7 flex items-center gap-1.5 transition-colors">
                ← Back
              </button>

              <h1 className="text-[26px] font-black tracking-tight text-gray-900 mb-1">Welcome back</h1>
              <p className="text-gray-400 text-sm mb-7">Sign in to your Atlantica account</p>

              {error && <div className="bg-red-50 border border-red-100 text-red-500 rounded-2xl px-4 py-3 text-sm mb-5">{error}</div>}

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSignIn()} className={inputClass} />
                </div>

                <button onClick={handleSignIn} disabled={loading} className="w-full bg-black hover:bg-zinc-800 disabled:opacity-40 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all mt-2">
                  {loading ? "Signing in..." : "Sign In →"}
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm mt-7">
                New here? <button onClick={() => { setMode("signup"); setError(""); }} className="text-black font-black hover:underline">Create an account</button>
              </p>
            </div>
          )}

          {mode === "signup" && (
            <div className="p-10">
              <button onClick={() => { setMode("choose"); setError(""); }} className="text-gray-400 hover:text-gray-600 text-[10px] font-black uppercase tracking-widest mb-7 flex items-center gap-1.5 transition-colors">
                ← Back
              </button>

              <h1 className="text-[26px] font-black tracking-tight text-gray-900 mb-1">Create account</h1>
              <p className="text-gray-400 text-sm mb-7">Join Atlantica and enjoy exclusive benefits</p>

              {error && <div className="bg-red-50 border border-red-100 text-red-500 rounded-2xl px-4 py-3 text-sm mb-5">{error}</div>}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input type="text" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input type="password" placeholder="••••••••" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSignUp()} className={inputClass} />
                </div>

                <button onClick={handleSignUp} disabled={loading} className="w-full bg-black hover:bg-zinc-800 disabled:opacity-40 text-white font-black uppercase tracking-widest text-xs py-4 rounded-2xl transition-all mt-2">
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm mt-7">
                Already have an account?{" "}
                <button onClick={() => { setMode("signin"); setError(""); }} className="text-black font-black hover:underline">Sign in</button>
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-white/25 text-[10px] mt-6 tracking-[0.3em] uppercase">
          Atlantica Hotel Management System
        </p>
      </div>
    </div>
  );
}