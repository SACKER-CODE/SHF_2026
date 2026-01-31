import React, { useState } from 'react';
import { Upload, BarChart3, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function ResumeAnalyzer() {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'matched' | 'missing' | 'suggestions'>('matched');
  const [recruiterView, setRecruiterView] = useState(false);

  const handleAnalyze = () => {
    if (!jobRole || !jobDescription || !resumeUploaded) {
      alert('Please fill all fields and upload a resume');
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzed(true);
      setAnalyzing(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeUploaded(true);
    }
  };

  const atsScore = 84;
  const keywordMatch = 78;
  const skillsAlignment = 92;
  const experienceMatch = 86;
  const formattingScore = 80;

  const matchedKeywords = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'API Development',
    'Git', 'Agile', 'Problem Solving', 'Team Collaboration', 'REST APIs',
    'Frontend Development', 'UI/UX', 'Responsive Design'
  ];

  const missingKeywords = [
    'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'CI/CD',
    'Microservices', 'Test-Driven Development', 'Performance Optimization'
  ];

  const improvements = [
    'Add quantified results (e.g., "Improved page load time by 40%")',
    'Align technology stack more closely with job description',
    'Increase keyword density for critical skills like GraphQL and cloud technologies',
    'Reorder experience section to highlight most relevant projects first',
    'Include specific metrics for team collaboration and leadership',
    'Add certifications or relevant coursework if applicable'
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
              📊 Resume Analyzer
            </span>
          </h2>
          <p className="text-gray-400">ATS Intelligence Dashboard - Optimize your resume for Applicant Tracking Systems</p>
        </div>
        
        {analyzed && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Recruiter View</span>
            <button
              onClick={() => setRecruiterView(!recruiterView)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                recruiterView ? 'bg-blue-500' : 'bg-white/10'
              }`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                recruiterView ? 'translate-x-7' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Input */}
        <div className="space-y-6">
          {/* Job Role */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">Job Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
              className="w-full px-4 py-3 bg-[#0B0B0F] border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
          </div>

          {/* Job Description */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-48 px-4 py-3 bg-[#0B0B0F] border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none"
            />
          </div>

          {/* Resume Upload */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <label className="block text-sm font-medium mb-3 text-gray-300">Upload Resume</label>
            <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              resumeUploaded 
                ? 'border-green-500/50 bg-green-500/5' 
                : 'border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50'
            }`}>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  {resumeUploaded ? (
                    <>
                      <CheckCircle2 className="w-12 h-12 text-green-400" />
                      <p className="text-green-400 font-medium">Resume uploaded successfully!</p>
                      <p className="text-sm text-gray-400">Click to replace</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-blue-400" />
                      <p className="text-gray-300 font-medium">Drag & drop your resume here</p>
                      <p className="text-sm text-gray-400">or click to browse (PDF, DOC, DOCX)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            {analyzing ? 'Analyzing Resume...' : 'Analyze Resume'}
          </button>
        </div>

        {/* Right Panel - Results */}
        <div className="space-y-6">
          {analyzing && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Analyzing your resume...</p>
            </div>
          )}

          {!analyzed && !analyzing && (
            <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Optimize</h3>
              <p className="text-gray-400 max-w-md">
                Fill in the job details and upload your resume to get detailed ATS analysis and optimization suggestions.
              </p>
            </div>
          )}

          {analyzed && !analyzing && (
            <>
              {/* ATS Score */}
              <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-8 text-center">
                <h3 className="text-lg font-semibold mb-6 text-gray-300">ATS Compatibility Score</h3>
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="url(#gradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(atsScore / 100) * 502} 502`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {atsScore}%
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs Work'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Score Breakdown</h3>
                
                <ScoreBar label="Keyword Match" score={keywordMatch} />
                <ScoreBar label="Skills Alignment" score={skillsAlignment} />
                <ScoreBar label="Experience Match" score={experienceMatch} />
                <ScoreBar label="Formatting Score" score={formattingScore} />
              </div>

              {/* Tabs Section */}
              <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex gap-2 mb-6 border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('matched')}
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === 'matched'
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Matched Keywords
                  </button>
                  <button
                    onClick={() => setActiveTab('missing')}
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === 'missing'
                        ? 'text-red-400 border-b-2 border-red-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Missing Keywords
                  </button>
                  <button
                    onClick={() => setActiveTab('suggestions')}
                    className={`px-4 py-2 font-medium transition-all ${
                      activeTab === 'suggestions'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    Suggestions
                  </button>
                </div>

                {activeTab === 'matched' && (
                  <div className="flex flex-wrap gap-2">
                    {matchedKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium"
                      >
                        ✓ {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'missing' && (
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium"
                      >
                        ✗ {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {activeTab === 'suggestions' && (
                  <ul className="space-y-3">
                    {improvements.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    if (score >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-gray-200">{score}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getColor(score)} transition-all duration-1000 rounded-full`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}