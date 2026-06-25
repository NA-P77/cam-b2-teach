import { BookOpen, Calendar, FileText, GraduationCap, Lightbulb, Users, Dumbbell, Timer, Lock } from 'lucide-react';
import React, { useState } from 'react';
import CurriculumMap from './components/CurriculumMap';
import ExamBreakdown from './components/ExamBreakdown';
import LessonStructure from './components/LessonStructure';
import TeachingTips from './components/TeachingTips';
import LessonPlanner from './components/LessonPlanner';
import ResourceBank from './components/ResourceBank';
import ClassTracker from './components/ClassTracker';
import MockTimer from './components/MockTimer';
import { TabId } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('b2_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');
  const [showToast, setShowToast] = useState(false);

  const navigation = [
    { id: 'curriculum', name: 'Curriculum Map', icon: Calendar },
    { id: 'lesson-planner', name: 'Interactive Planner', icon: FileText },
    { id: 'resource-bank', name: 'Worksheet & Resources', icon: Dumbbell },
    { id: 'class-tracker', name: 'Class & Mock Tracker', icon: Users },
    { id: 'mock-timer', name: 'Mock Exam Timer', icon: Timer },
    { id: 'lesson-plan', name: 'Standard Structure', icon: FileText },
    { id: 'exam-breakdown', name: 'Exam Breakdown', icon: BookOpen },
    { id: 'tips', name: 'Teaching Tips', icon: Lightbulb },
  ] as const;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'b2teacher') {
      setIsAuthenticated(true);
      sessionStorage.setItem('b2_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  const handleSaveProgress = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center font-sans text-slate-200">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">B2 Mastery Teacher Portal</h1>
            <p className="text-xs text-slate-400">Enter password to gain access</p>
          </div>

          <div className="space-y-2">
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Enter password..."
              className="w-full text-xs bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none text-white focus:border-indigo-500 transition-all text-center"
            />
            {authError && (
              <p className="text-[10px] text-rose-500 font-bold text-center">{authError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-500/10 transition-all"
          >
            Access Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#F8FAFC] font-sans text-slate-800 flex overflow-hidden relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-800 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          All curriculum edits and student mock scores saved to browser LocalStorage!
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 print:hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
             <h1 className="text-xl font-bold tracking-tight text-indigo-600">B2 Mastery</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-semibold">Teacher's Guide</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Planner</div>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm flex-shrink-0 print:hidden">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold text-indigo-600">
              {navigation.find(n => n.id === activeTab)?.name.toUpperCase()}
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
               {navigation.find(n => n.id === activeTab)?.name}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
             <button 
               onClick={handleSaveProgress}
               className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm shadow-indigo-200 transition-colors"
             >
               Save Progress
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 print:p-0">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'curriculum' && (
              <CurriculumMap 
                onNavigateToPlanner={(wk) => {
                  localStorage.setItem('selected_planner_week', String(wk));
                  setActiveTab('lesson-planner');
                }} 
              />
            )}
            {activeTab === 'lesson-planner' && <LessonPlanner />}
            {activeTab === 'resource-bank' && <ResourceBank />}
            {activeTab === 'class-tracker' && <ClassTracker />}
            {activeTab === 'mock-timer' && <MockTimer />}
            {activeTab === 'lesson-plan' && <LessonStructure />}
            {activeTab === 'exam-breakdown' && <ExamBreakdown />}
            {activeTab === 'tips' && <TeachingTips />}
          </div>
        </div>
      </main>
    </div>
  );
}
