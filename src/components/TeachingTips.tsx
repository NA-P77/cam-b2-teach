import React, { useState, useEffect } from 'react';
import { AlertCircle, ArrowRight, CheckSquare, Square, RefreshCw } from 'lucide-react';
import { TEACHING_TIPS } from '../data';

const SELF_REFLECTIONS = [
  { id: 'ttt', label: 'I kept Teacher Talking Time (TTT) under 30% today.' },
  { id: 'delay-correction', label: 'I delayed error correction instead of interrupting students mid-fluency.' },
  { id: 'warmup', label: 'I did not skip the warm-up/lead-in phase.' },
  { id: 'strategy', label: 'I explicitly taught or reinforced at least one exam strategy.' },
  { id: 'peer-work', label: 'Students checked each other\'s work in pairs or groups before open class review.' }
];

export default function TeachingTips() {
  const [completedReflections, setCompletedReflections] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('b2_teacher_reflections');
    if (saved) {
      try {
        setCompletedReflections(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reflections', e);
      }
    }
  }, []);

  const toggleReflection = (id: string) => {
    const updated = completedReflections.includes(id)
      ? completedReflections.filter(x => x !== id)
      : [...completedReflections, id];
    
    setCompletedReflections(updated);
    localStorage.setItem('b2_teacher_reflections', JSON.stringify(updated));
  };

  const handleResetReflections = () => {
    setCompletedReflections([]);
    localStorage.removeItem('b2_teacher_reflections');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      
      {/* Left side: Main teaching tips */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        {TEACHING_TIPS.slice(0, 2).map((tip, idx) => (
          <section key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" /> {tip.title}
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">{tip.description}</p>
            
            <div className="space-y-3">
              {tip.actionable.map((action, aIdx) => (
                <div key={aIdx} className="flex items-start bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-400">
                  <p className="text-xs font-semibold text-slate-700">{action}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Right side: Jargon cards + Interactive Self Reflection Checklist */}
      <div className="lg:col-span-4 flex flex-col space-y-6">
        
        {/* Interactive Self Reflection Card */}
        <section className="bg-indigo-900 text-white rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              Daily Class Self-Reflection
            </h3>
            <button
              onClick={handleResetReflections}
              className="p-1 text-indigo-300 hover:text-white rounded hover:bg-indigo-850"
              title="Reset checklist"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-indigo-200 leading-relaxed">
            Reflect on your class performance today by ticking off checklist items:
          </p>
          
          <div className="space-y-3 pt-2">
            {SELF_REFLECTIONS.map(item => {
              const isChecked = completedReflections.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleReflection(item.id)}
                  className="flex items-start gap-2.5 cursor-pointer select-none group"
                >
                  <div className="shrink-0 mt-0.5 text-indigo-300 group-hover:text-white transition-colors">
                    {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] font-medium leading-tight transition-colors ${
                    isChecked ? 'text-indigo-200 line-through' : 'text-indigo-100 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Other static tips */}
        {TEACHING_TIPS.slice(2).map((tip, idx) => (
          <section key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-4">
              {tip.title}
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">{tip.description}</p>
            <div className="space-y-3">
              {tip.actionable.map((action, aIdx) => (
                <div key={aIdx} className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-indigo-500 rounded flex items-center justify-center bg-indigo-50 shrink-0">
                    <ArrowRight className="w-2.5 h-2.5 text-indigo-600" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">{action}</span>
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
