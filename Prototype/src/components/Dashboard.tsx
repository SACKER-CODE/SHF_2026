import React, { useState } from 'react';
import { Menu, X, FileText, Briefcase, User, Bell, Brain, Search, BarChart3, Video, LogOut, ChevronDown } from 'lucide-react';
import { AIHub } from './AIHub';
import { ResumeAnalyzer } from './ResumeAnalyzer';
import { InterviewModule } from './InterviewModule';
import { TestModule } from './TestModule';
import { SessionModal } from './SessionModal';

type ActiveModule = 'ai-hub' | 'test' | 'resume' | 'interview';

interface Session {
  id: string;
  name: string;
  jobRole: string;
  experience: number;
  jobDescription: string;
  description: string;
  createdAt: string;
}

interface DashboardProps {
  userName: string;
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onCreateNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
  onLogout: () => void;
}

export function Dashboard({
  userName,
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateNewSession,
  onDeleteSession,
  onLogout
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState<ActiveModule>('ai-hub');
  const [sessionModalOpen, setSessionModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 bg-[#121218]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            Prism Hire
          </h1>
        </div>
        
        {/* Search and User Controls */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-64"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          
          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#121218]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-purple-500/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-3 border-b border-white/10">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-400">Premium Account</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } min-h-[calc(100vh-4rem)] border-r border-white/5 bg-[#121218]/50 backdrop-blur-xl transition-all duration-300 overflow-hidden`}
        >
          <div className="p-6 w-64">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6 pb-6 border-b border-white/10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/20">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-sm text-gray-400 mb-3">Welcome back!</p>
              
              {/* Active Session Badge */}
              {activeSession && (
                <button
                  onClick={() => setSessionModalOpen(true)}
                  className="w-full px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-center hover:from-blue-500/30 hover:to-purple-500/30 transition-all group"
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-semibold text-blue-400">Current Session</span>
                  </div>
                  <p className="text-sm font-semibold truncate group-hover:text-blue-300 transition-colors">
                    {activeSession.name}
                  </p>
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <NavItem 
                icon={<Brain className="w-5 h-5" />}
                label="AI Hub"
                active={activeModule === 'ai-hub'}
                onClick={() => setActiveModule('ai-hub')}
              />
              <NavItem 
                icon={<FileText className="w-5 h-5" />}
                label="Test Module"
                active={activeModule === 'test'}
                onClick={() => setActiveModule('test')}
              />
              <NavItem 
                icon={<BarChart3 className="w-5 h-5" />}
                label="Resume Analyzer"
                active={activeModule === 'resume'}
                onClick={() => setActiveModule('resume')}
              />
              <NavItem 
                icon={<Video className="w-5 h-5" />}
                label="Interview Module"
                active={activeModule === 'interview'}
                onClick={() => setActiveModule('interview')}
              />
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {activeModule === 'ai-hub' && <AIHub />}
          {activeModule === 'test' && <TestModule sidebarOpen={sidebarOpen} />}
          {activeModule === 'resume' && <ResumeAnalyzer />}
          {activeModule === 'interview' && <InterviewModule />}
        </main>
      </div>

      {/* Session Modal */}
      <SessionModal
        isOpen={sessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={onSelectSession}
        onCreateNew={onCreateNewSession}
        onDeleteSession={onDeleteSession}
      />
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10'
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
