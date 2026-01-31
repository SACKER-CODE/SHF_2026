import React, { useState } from 'react';
import { Check, Sparkles, Brain, BarChart3, Video, CheckCircle2 } from 'lucide-react';

interface SignInPageProps {
  onSignIn: (name: string, email: string) => void;
}

export function SignInPage({ onSignIn }: SignInPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!name.trim()) {
        alert('Please enter your name');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
    }
    
    if (!email.trim() || !password) {
      alert('Please fill in all fields');
      return;
    }

    onSignIn(name || email.split('@')[0], email);
  };

  const features = [
    { icon: <Brain className="w-5 h-5" />, text: 'Multi-Model AI Hub' },
    { icon: <BarChart3 className="w-5 h-5" />, text: 'ATS Resume Scoring' },
    { icon: <Video className="w-5 h-5" />, text: 'Live AI Interview System' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden p-12 flex-col justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-violet-600/20 animate-gradient-shift"></div>
        
        {/* Floating glass shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 backdrop-blur-xl rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 backdrop-blur-xl rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                Prism Hire
              </h1>
            </div>
            
            {/* Headline */}
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Intelligent Hiring<br />Starts Here.
            </h2>
            
            {/* Subtext */}
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-lg">
              AI-powered interview prep, resume scoring, and multi-model intelligence in one platform.
            </p>
            
            {/* Feature bullets */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-lg font-medium">{feature.text}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isSignUp
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isSignUp
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field (Sign up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'name'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                </div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    focusedField === 'email'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    focusedField === 'password'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Confirm Password (Sign up only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'confirmPassword'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                </div>
              )}

              {/* Primary Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#121218] text-gray-400">or continue with</span>
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => onSignIn('Demo User', 'demo@prismhire.com')}
                className="w-full py-3.5 bg-white/5 border-2 border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Footer text */}
            {!isSignUp && (
              <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            )}
            {isSignUp && (
              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
