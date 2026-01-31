import React, { useState } from 'react';
import { X, Plus, Calendar, Briefcase, Target, Trash2 } from 'lucide-react';

interface Session {
  id: string;
  name: string;
  jobRole: string;
  experience: number;
  jobDescription: string;
  description: string;
  createdAt: string;
}

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Session[];
  activeSessionId: string;
  onSelectSession: (sessionId: string) => void;
  onCreateNew: () => void;
  onDeleteSession: (sessionId: string) => void;
}

export function SessionModal({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelectSession,
  onCreateNew,
  onDeleteSession
}: SessionModalProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (sessions.length === 1) {
      alert('Cannot delete the last session. Create a new one first.');
      return;
    }
    
    if (sessionId === activeSessionId) {
      alert('Cannot delete the active session. Switch to another session first.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      setDeletingId(sessionId);
      setTimeout(() => {
        onDeleteSession(sessionId);
        setDeletingId(null);
      }, 300);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#121218]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 w-full max-w-3xl max-h-[80vh] overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Sessions
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions List */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="grid grid-cols-1 gap-4 mb-6">
            {sessions.map((session) => {
              const isActive = session.id === activeSessionId;
              const isDeleting = session.id === deletingId;
              
              return (
                <div
                  key={session.id}
                  onClick={() => {
                    if (!isActive && !isDeleting) {
                      onSelectSession(session.id);
                      onClose();
                    }
                  }}
                  className={`group relative bg-[#0B0B0F]/80 border-2 rounded-xl p-5 transition-all duration-300 ${
                    isDeleting
                      ? 'opacity-50 scale-95'
                      : isActive
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20 cursor-default'
                      : 'border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
                      Active
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" />
                        {session.name}
                      </h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{session.jobRole}</span>
                          {session.experience > 0 && (
                            <>
                              <span className="text-white/20">•</span>
                              <span>{session.experience} {session.experience === 1 ? 'year' : 'years'}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Created {formatDate(session.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {!isActive && (
                      <button
                        onClick={(e) => handleDelete(session.id, e)}
                        className="p-2 rounded-lg hover:bg-red-500/20 border border-transparent hover:border-red-500/30 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    )}
                  </div>

                  {session.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mt-3 pt-3 border-t border-white/10">
                      {session.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Create New Session Button */}
          <button
            onClick={() => {
              onCreateNew();
              onClose();
            }}
            className="w-full py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-dashed border-blue-500/30 text-blue-400 rounded-xl font-semibold hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Session
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
