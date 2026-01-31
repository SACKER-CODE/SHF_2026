import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, RotateCcw, Plus, Bookmark, ArrowRight, Shuffle, FileText } from 'lucide-react';

type Difficulty = 'Basic' | 'Medium' | 'Hard';
type QuestionCount = 5 | 20 | 30;
type ViewState = 'overview' | 'config' | 'loading' | 'test' | 'results' | 'saved' | 'completed';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface UserAnswers {
  [key: number]: number;
}

// Sample questions for Frontend Developer role
const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the purpose of the Virtual DOM in React?",
    options: [
      "Directly updates the browser DOM",
      "Improves performance by minimizing DOM changes",
      "Manages server-side rendering",
      "Handles API requests"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which CSS property is used to create a flexbox container?",
    options: [
      "display: block",
      "display: inline",
      "display: flex",
      "display: grid"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What does the 'useState' hook return in React?",
    options: [
      "A single state value",
      "An array with state value and setter function",
      "An object with state properties",
      "A callback function"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which HTTP method is used to update existing data on a server?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the purpose of the 'key' prop in React lists?",
    options: [
      "To style list items",
      "To help React identify which items have changed",
      "To sort the list",
      "To filter list items"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "Which JavaScript method is used to combine two or more arrays?",
    options: [
      "join()",
      "concat()",
      "merge()",
      "combine()"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What does CSS Grid's 'grid-template-columns' property define?",
    options: [
      "The number of rows in the grid",
      "The width of each column",
      "The gap between columns",
      "The alignment of grid items"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "In JavaScript, what does the 'async' keyword do?",
    options: [
      "Creates a synchronous function",
      "Creates a function that returns a Promise",
      "Stops code execution",
      "Handles errors automatically"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which React hook is used for side effects?",
    options: [
      "useState",
      "useContext",
      "useEffect",
      "useReducer"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What is the box model in CSS?",
    options: [
      "A design pattern for layouts",
      "The model that defines how elements are displayed with margin, border, padding, and content",
      "A JavaScript framework",
      "A grid system"
    ],
    correctAnswer: 1
  },
  {
    id: 11,
    question: "What is closure in JavaScript?",
    options: [
      "A way to close browser windows",
      "A function that has access to variables in its outer scope",
      "A method to end loops",
      "A CSS property"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Which HTML5 element is used for navigation links?",
    options: [
      "<navigation>",
      "<nav>",
      "<menu>",
      "<links>"
    ],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "What does REST stand for in API design?",
    options: [
      "Remote Execution State Transfer",
      "Representational State Transfer",
      "Rapid Execution Service Technology",
      "Resource Encryption Standard Transfer"
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "Which CSS unit is relative to the viewport width?",
    options: [
      "px",
      "em",
      "vw",
      "pt"
    ],
    correctAnswer: 2
  },
  {
    id: 15,
    question: "What is event bubbling in JavaScript?",
    options: [
      "Events triggering in random order",
      "Events propagating from child to parent elements",
      "Events being cancelled",
      "Events triggering multiple times"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Which React method is used to update component state?",
    options: [
      "updateState()",
      "setState()",
      "modifyState()",
      "changeState()"
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "What is the purpose of 'npm' in web development?",
    options: [
      "Node Package Manager for managing JavaScript packages",
      "A code editor",
      "A CSS framework",
      "A testing tool"
    ],
    correctAnswer: 0
  },
  {
    id: 18,
    question: "Which JavaScript operator is used for strict equality?",
    options: [
      "=",
      "==",
      "===",
      "===="
    ],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "What does SPA stand for in web development?",
    options: [
      "Server Page Application",
      "Single Page Application",
      "Synchronized Page Architecture",
      "Static Page Assembly"
    ],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "Which CSS property controls the stacking order of elements?",
    options: [
      "stack-order",
      "z-index",
      "layer",
      "depth"
    ],
    correctAnswer: 1
  }
];

export function TestModule({ sidebarOpen }: { sidebarOpen: boolean }) {
  const [viewState, setViewState] = useState<ViewState>('overview');
  const [jobRole, setJobRole] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(20);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleGenerateTest = () => {
    if (!jobRole.trim()) {
      alert('Please enter a job role');
      return;
    }
    setViewState('loading');
    setUserAnswers({});
    setTimeout(() => {
      const selectedQuestions = sampleQuestions.slice(0, questionCount);
      setQuestions(selectedQuestions);
      setViewState('test');
    }, 1500);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitTest = () => {
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < questions.length) {
      const unanswered = questions.length - answeredCount;
      if (!confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }
    setViewState('results');
  };

  const handleRetakeTest = () => {
    setUserAnswers({});
    setViewState('test');
  };

  const handleGenerateNewTest = () => {
    setUserAnswers({});
    setQuestions([]);
    setJobRole('');
    setViewState('config');
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    let status = '';
    let statusColor = '';
    
    if (percentage >= 80) {
      status = 'Excellent Performance';
      statusColor = 'text-green-400 bg-green-500/20';
    } else if (percentage >= 60) {
      status = 'Good Performance';
      statusColor = 'text-blue-400 bg-blue-500/20';
    } else if (percentage >= 40) {
      status = 'Fair Performance';
      statusColor = 'text-yellow-400 bg-yellow-500/20';
    } else {
      status = 'Needs Improvement';
      statusColor = 'text-red-400 bg-red-500/20';
    }

    return { correctCount, percentage, status, statusColor };
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Test Module</h2>
      
      {/* Overview Page */}
      {viewState === 'overview' && (
        <div>
          <div className="mb-8">
            <p className="text-gray-400 leading-relaxed mb-2">
              Welcome to the Test Module - your comprehensive platform for technical assessments and skill evaluation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-2">
              Access your saved questions for quick reference, generate random AI-powered tests tailored to your career goals.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Each feature is designed to help you prepare effectively and build confidence for real-world technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bookmark className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Saved Questions</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Access your bookmarked questions from previous tests. Build your personal question bank for focused review and practice.
              </p>
              <button
                onClick={() => setViewState('saved')}
                className="w-full px-4 py-2.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
              >
                View Saved
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shuffle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Random Questions</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Generate AI-powered tests customized to your job role, difficulty level, and question count. Perfect for comprehensive practice.
              </p>
              <button
                onClick={() => setViewState('config')}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all flex items-center justify-center gap-2"
              >
                Generate Test
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Questions Page */}
      {viewState === 'saved' && (
        <div>
          <button
            onClick={() => setViewState('overview')}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
          >
            ← Back to Overview
          </button>
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No Saved Questions Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Start taking tests and bookmark questions you want to review later. Your saved questions will appear here.
            </p>
          </div>
        </div>
      )}

      {/* Completed Questions Page */}
      {viewState === 'completed' && (
        <div>
          <button
            onClick={() => setViewState('overview')}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
          >
            ← Back to Overview
          </button>
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No Completed Questions</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Complete questions in the Interview Module to track your progress. Your completed questions will be displayed here.
            </p>
          </div>
        </div>
      )}

      {/* Config Page */}
      {viewState === 'config' && (
        <div>
          <button
            onClick={() => setViewState('overview')}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
          >
            ← Back to Overview
          </button>

          <p className="text-gray-400 mb-6 leading-relaxed">
            This test is generated in real time by AI using your selected job role, difficulty level, and question count.
            Each question is designed to reflect current interview standards and commonly tested concepts.
          </p>
          
          <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[240px]">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Job Role
                </label>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0B0B0F] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 bg-[#0B0B0F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[140px]"
                >
                  <option value="Basic">Basic</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value) as QuestionCount)}
                  className="px-4 py-2.5 rounded-lg border border-white/10 bg-[#0B0B0F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[160px]"
                >
                  <option value={5}>5 Questions</option>
                  <option value={20}>20 Questions</option>
                  <option value={30}>30 Questions</option>
                </select>
              </div>

              <button
                onClick={handleGenerateTest}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Test
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to test your skills?</h3>
            <p className="text-gray-400 max-w-md">
              Configure your test parameters above and click "Generate Test" to begin your AI-powered assessment.
            </p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {viewState === 'loading' && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Generating your personalized test...</p>
        </div>
      )}

      {/* Test State */}
      {viewState === 'test' && (
        <div className="space-y-6 pb-24">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-semibold text-sm">
                  {idx + 1}
                </span>
                <p className="text-lg font-medium flex-1">{q.question}</p>
              </div>
              <div className="space-y-3 ml-11">
                {q.options.map((option, index) => {
                  const optionLetter = String.fromCharCode(65 + index);
                  const isSelected = userAnswers[q.id] === index;
                  return (
                    <label
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(q.id, index)}
                        className="mt-1 w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                      />
                      <span className="flex-1 text-gray-300">
                        <span className="font-semibold mr-2">{optionLetter}.</span>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div className="fixed bottom-0 left-0 right-0 bg-[#121218]/90 backdrop-blur-xl border-t border-white/10 p-4 z-20">
            <div className={`max-w-7xl mx-auto flex justify-between items-center ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
              <div className="text-sm text-gray-400">
                Answered: {Object.keys(userAnswers).length} / {questions.length}
              </div>
              <button
                onClick={handleSubmitTest}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results State */}
      {viewState === 'results' && (() => {
        const { correctCount, percentage, status, statusColor } = calculateResults();
        
        return (
          <div className="space-y-6">
            <div className="bg-[#121218]/80 backdrop-blur-xl border border-white/10 rounded-xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Test Complete!</h3>
                <p className="text-gray-400">Here's how you performed</p>
              </div>

              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                    {correctCount} / {questions.length}
                  </div>
                  <p className="text-sm text-gray-400">Correct Answers</p>
                </div>

                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                    {percentage}%
                  </div>
                  <p className="text-sm text-gray-400">Score</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span className={`px-6 py-3 rounded-full font-semibold ${statusColor}`}>
                  {status}
                </span>
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={handleRetakeTest}
                  className="px-6 py-3 bg-white/5 border-2 border-blue-500/50 text-blue-400 rounded-lg font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Test
                </button>
                <button
                  onClick={handleGenerateNewTest}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Generate New Test
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Detailed Review</h4>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;
                  
                  return (
                    <div 
                      key={q.id} 
                      className={`bg-[#121218]/80 backdrop-blur-xl border-2 rounded-xl p-6 ${
                        isCorrect 
                          ? 'border-green-500/30' 
                          : 'border-red-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                          isCorrect 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-lg font-medium mb-4">{q.question}</p>
                          
                          <div className="space-y-2">
                            {q.options.map((option, index) => {
                              const optionLetter = String.fromCharCode(65 + index);
                              const isUserAnswer = userAnswer === index;
                              const isCorrectAnswer = q.correctAnswer === index;
                              
                              return (
                                <div
                                  key={index}
                                  className={`flex items-start gap-3 p-3 rounded-lg border-2 ${
                                    isCorrectAnswer
                                      ? 'border-green-500 bg-green-500/10'
                                      : isUserAnswer && !isCorrect
                                      ? 'border-red-500 bg-red-500/10'
                                      : 'border-white/10'
                                  }`}
                                >
                                  {isCorrectAnswer && (
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                  )}
                                  {isUserAnswer && !isCorrect && (
                                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className="flex-1 text-gray-300">
                                    <span className="font-semibold mr-2">{optionLetter}.</span>
                                    {option}
                                    {isCorrectAnswer && (
                                      <span className="ml-2 text-xs font-semibold text-green-400">
                                        (Correct Answer)
                                      </span>
                                    )}
                                    {isUserAnswer && !isCorrect && (
                                      <span className="ml-2 text-xs font-semibold text-red-400">
                                        (Your Answer)
                                      </span>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}