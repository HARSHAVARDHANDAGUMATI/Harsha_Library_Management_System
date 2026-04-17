import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Library, Mail, Lock, User, ArrowRight, Shield, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!name || !email || !password || !confirmPassword) return toast.error("Please fill all fields");
      if (password !== confirmPassword) return toast.error("Passwords do not match");
      register(name, email, password);
      toast.success("Welcome to LMS Pro, " + name);
    } else {
      if (!email || !password) return toast.error("Please fill all fields");
      login(email, password);
      toast.success("Welcome back!");
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] relative overflow-hidden p-4">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500 relative z-10">
        <div className="glass-premium rounded-[2.5rem] border border-white/10 p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6 group transition-transform hover:scale-110">
              <Library className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">
              {isRegister ? "Create Account" : "Access Archive"}
            </h1>
            <p className="text-muted-foreground text-sm max-w-[280px]">
              {isRegister 
                ? "Join our premium library community and start collecting." 
                : "Enter your credentials to manage your digital library."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Harsha Vardhan"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  placeholder="harsha@lms.pro"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Password</label>
                {!isRegister && <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all mt-4 group"
            >
              {isRegister ? "Create Account" : "Access Dashboard"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-[#0a0a0b]/50 px-4 text-muted-foreground/40 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium hover:bg-white/10 transition-all text-white">
              <Globe className="h-4 w-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-medium hover:bg-white/10 transition-all text-white">
              <Shield className="h-4 w-4" /> Github
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {isRegister ? "Already an archivist?" : "New to the archive?"}{" "}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-primary font-bold hover:underline transition-all"
              >
                {isRegister ? "Access now" : "Register now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
