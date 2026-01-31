import React, { useState, useEffect } from 'react';
import { SignInPage } from './components/SignInPage';
import { SessionPage } from './components/SessionPage';
import { Dashboard } from './components/Dashboard';

type AppState = 'sign-in' | 'session-create' | 'dashboard';

interface Session {
  id: string;
  name: string;
  jobRole: string;
  experience: number;
  jobDescription: string;
  description: string;
  createdAt: string;
}

interface AppData {
  isAuthenticated: boolean;
  userName: string;
  userEmail: string;
  sessions: Session[];
  activeSessionId: string | null;
}

const STORAGE_KEY = 'prism-hire-data';

export default function App() {
  const [appState, setAppState] = useState<AppState>('sign-in');
  const [appData, setAppData] = useState<AppData>({
    isAuthenticated: false,
    userName: '',
    userEmail: '',
    sessions: [],
    activeSessionId: null
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setAppData(parsed);
        
        if (parsed.isAuthenticated) {
          if (parsed.sessions.length > 0 && parsed.activeSessionId) {
            setAppState('dashboard');
          } else {
            setAppState('session-create');
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (appData.isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }
  }, [appData]);

  const handleSignIn = (name: string, email: string) => {
    setAppData({
      ...appData,
      isAuthenticated: true,
      userName: name,
      userEmail: email
    });
    setAppState('session-create');
  };

  const handleCreateSession = (sessionData: {
    name: string;
    jobRole: string;
    experience: number;
    jobDescription: string;
    description: string;
  }) => {
    const newSession: Session = {
      id: Date.now().toString(),
      ...sessionData,
      createdAt: new Date().toISOString()
    };

    setAppData({
      ...appData,
      sessions: [...appData.sessions, newSession],
      activeSessionId: newSession.id
    });
    setAppState('dashboard');
  };

  const handleSelectSession = (sessionId: string) => {
    setAppData({
      ...appData,
      activeSessionId: sessionId
    });
  };

  const handleCreateNewSession = () => {
    setAppState('session-create');
  };

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = appData.sessions.filter(s => s.id !== sessionId);
    
    setAppData({
      ...appData,
      sessions: updatedSessions
    });
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      localStorage.removeItem(STORAGE_KEY);
      setAppData({
        isAuthenticated: false,
        userName: '',
        userEmail: '',
        sessions: [],
        activeSessionId: null
      });
      setAppState('sign-in');
    }
  };

  // Render based on app state
  if (appState === 'sign-in') {
    return <SignInPage onSignIn={handleSignIn} />;
  }

  if (appState === 'session-create') {
    return (
      <SessionPage
        userName={appData.userName}
        onCreateSession={handleCreateSession}
      />
    );
  }

  if (appState === 'dashboard' && appData.activeSessionId) {
    return (
      <Dashboard
        userName={appData.userName}
        sessions={appData.sessions}
        activeSessionId={appData.activeSessionId}
        onSelectSession={handleSelectSession}
        onCreateNewSession={handleCreateNewSession}
        onDeleteSession={handleDeleteSession}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}
