import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Briefcase, TrendingUp, FileText, Target } from 'lucide-react';

interface SessionPageProps {
  userName: string;
  onCreateSession: (session: {
    name: string;
    jobRole: string;
    experience: number;
    jobDescription: string;
    description: string;
  }) => void;
}

export function SessionPage({ userName, onCreateSession }: SessionPageProps) {
  const [sessionName, setSessionName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [experience, setExperience] = useState<number>(0);
  const [jobDescription, setJobDescription] = useState('');
  const [description, setDescription] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionName.trim() || !jobRole.trim()) {
      alert('Please fill in Session Name and Job Role');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate success animation
    setTimeout(() => {
      onCreateSession({
        name: sessionName,
        jobRole,
        experience,
        jobDescription,
        description
      });
    }, 800);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl shadow-purple-500/50">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Session Created!</h3>
          <p className="text-gray-400">Redirecting to AI Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#121218]/80 backdrop-blur-xl px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            Prism Hire
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Welcome,</span>
          <span className="font-semibold">{userName}</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center p-6 lg:p-12 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-3xl">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Create New Session</h2>
            <p className="text-gray-400 text-lg">
              Set up your interview preparation session with job-specific details and goals.
            </p>
          </div>

          {/* Glass Card */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/10 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Target className="w-4 h-4 text-blue-400" />
                  Session Name
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  onFocus={() => setFocusedField('sessionName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g., Backend Developer - Flipkart Prep"
                  className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                    focusedField === 'sessionName'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Job Role & Experience Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    Job Role
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    onFocus={() => setFocusedField('jobRole')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g., Backend Developer"
                    className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                      focusedField === 'jobRole'
                        ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    Experience
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(Math.max(0, parseInt(e.target.value) || 0))}
                      onFocus={() => setFocusedField('experience')}
                      onBlur={() => setFocusedField(null)}
                      min="0"
                      className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        focusedField === 'experience'
                          ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      Years
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <FileText className="w-4 h-4 text-violet-400" />
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  onFocus={() => setFocusedField('jobDescription')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Paste the job description here (responsibilities, requirements, skills needed)..."
                  rows={6}
                  className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                    focusedField === 'jobDescription'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Description / Goals */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Description / Goals
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="What are your goals for this session? What do you want to focus on?..."
                  rows={4}
                  className={`w-full px-4 py-3 bg-[#0B0B0F] border-2 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 resize-none ${
                    focusedField === 'description'
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Create Session
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-sm text-blue-300 leading-relaxed">
                <strong>Pro tip:</strong> You can create multiple sessions for different job applications and switch between them anytime. Each session maintains its own data and progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
