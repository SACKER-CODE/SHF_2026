import React, { useState } from 'react';
import { Video, Mic, Camera, Phone, Download, Sparkles, Activity } from 'lucide-react';

interface Message {
  sender: 'ai' | 'candidate';
  text: string;
  timestamp: string;
}

export function InterviewModule() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(845); // 14:05 in seconds

  const messages: Message[] = [
    {
      sender: 'ai',
      text: "Hello! I'm your AI interviewer today. Let's start with an introduction. Can you tell me about yourself and your experience?",
      timestamp: '00:00'
    },
    {
      sender: 'candidate',
      text: "Hi! I'm a frontend developer with 3 years of experience in React and TypeScript. I've worked on building scalable web applications and have a strong focus on UI/UX best practices.",
      timestamp: '00:15'
    },
    {
      sender: 'ai',
      text: "Great! Can you explain the concept of polymorphism in object-oriented programming?",
      timestamp: '00:45'
    },
    {
      sender: 'candidate',
      text: "Polymorphism allows methods to behave differently based on the object that calls them. It enables code reusability and flexibility. For example, in inheritance, a child class can override a parent class method to provide specific implementation.",
      timestamp: '01:02'
    },
    {
      sender: 'ai',
      text: "Excellent explanation. Now, tell me about a challenging technical problem you solved recently.",
      timestamp: '01:30'
    },
    {
      sender: 'candidate',
      text: "I optimized a React application that had performance issues with large lists. I implemented virtualization using react-window and memoization with useMemo to reduce unnecessary re-renders, which improved the rendering performance by 60%.",
      timestamp: '01:48'
    },
    {
      sender: 'ai',
      text: "That's impressive! How do you approach debugging complex issues in production?",
      timestamp: '02:15'
    },
    {
      sender: 'candidate',
      text: "I follow a systematic approach: first, I reproduce the issue in a controlled environment. Then I use logging and error tracking tools like Sentry to identify the root cause. I also leverage browser dev tools and React DevTools for frontend issues.",
      timestamp: '02:35'
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateFeedback = () => {
    setShowFeedback(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            🎥 Interview Module
          </span>
        </h2>
        <p className="text-gray-400">Live AI Interview Room - Practice with real-time AI feedback</p>
      </div>

      {!interviewStarted ? (
        <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Interview?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Join an AI-powered mock interview session. Get real-time feedback on your communication, technical depth, and overall performance.
          </p>
          <button
            onClick={() => setInterviewStarted(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2 mx-auto"
          >
            <Video className="w-5 h-5" />
            Start Interview
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Area - 70% width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Video */}
            <div className="bg-[#121218]/80 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 relative">
              {/* Simulated Video */}
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl shadow-purple-500/50">
                    <Video className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-xl font-semibold mb-2">Interview in Progress</p>
                  <p className="text-gray-400">Your camera feed will appear here</p>
                </div>

                {/* AI Interviewer Thumbnail */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-[#0B0B0F] border-2 border-blue-500/50 rounded-lg overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 left-1 right-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-center">
                    AI Interviewer
                  </div>
                </div>

                {/* Active Speaker Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-500/20 border border-green-500/50 px-3 py-2 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium">AI Listening...</span>
                </div>

                {/* Audio Waveform */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-blue-500 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 24 + 8}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="bg-[#0B0B0F] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-gray-400">Recording</span>
                  <span className="text-white font-mono">{formatTime(elapsedTime)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMicEnabled(!micEnabled)}
                    className={`p-3 rounded-lg transition-all ${
                      micEnabled
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                    title="Toggle microphone"
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCameraEnabled(!cameraEnabled)}
                    className={`p-3 rounded-lg transition-all ${
                      cameraEnabled
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                    title="Toggle camera"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setInterviewStarted(false)}
                    className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all text-red-400"
                    title="End interview"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            {showFeedback && (
              <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-violet-500/10 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-6 animate-fade-in">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  AI Performance Feedback
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#121218]/60 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Communication</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      </div>
                      <span className="text-lg font-semibold text-blue-400">85%</span>
                    </div>
                  </div>

                  <div className="bg-[#121218]/60 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Technical Depth</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"></div>
                      </div>
                      <span className="text-lg font-semibold text-purple-400">78%</span>
                    </div>
                  </div>

                  <div className="bg-[#121218]/60 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Confidence</div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-lg font-semibold text-green-400">92%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#121218]/60 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-3 text-blue-400">Suggested Improvements</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Provide more specific examples when discussing technical concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Include quantifiable metrics in your project descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Maintain consistent eye contact with the camera</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Slow down slightly when explaining complex topics</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-full">
                    <span className="text-lg font-semibold text-green-400">Overall Rating: Strong Performance ⭐</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transcript Panel - 30% width on large screens */}
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Live Transcript
            </h3>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-[600px] custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.sender === 'candidate' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === 'ai'
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-purple-500/20 border border-purple-500/30'
                      }`}
                    >
                      <p className="text-sm text-gray-300">{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-2">
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      <span className="text-xs text-gray-500">
                        {msg.sender === 'ai' ? 'AI Interviewer' : 'You'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-gray-300">
                <Download className="w-4 h-4" />
                Download Transcript
              </button>
              <button
                onClick={handleGenerateFeedback}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 rounded-lg font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all flex items-center justify-center gap-2 text-purple-400"
              >
                <Sparkles className="w-4 h-4" />
                Generate AI Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}