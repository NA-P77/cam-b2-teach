import React, { useState } from 'react';
import { LESSON_STRUCTURE } from '../data';
import { Clock, Sliders } from 'lucide-react';

export default function LessonStructure() {
  const [totalMinutes, setTotalMinutes] = useState(90);

  // Proportional time calculator ratios: 10%, 20%, 20%, 40%, 10%
  const timeRatios = [0.1, 0.2, 0.2, 0.4, 0.1];

  const getCalculatedTime = (index: number) => {
    const mins = Math.round(totalMinutes * timeRatios[index]);
    return `${mins} mins`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      
      {/* Interactive Timing Calculator Header */}
      <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-500" /> Lesson Pacing Calculator
          </h3>
          <p className="text-xs text-slate-500">Adjust total class time to auto-scale phase durations proportionally</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto shrink-0">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
          <div className="flex-1 md:w-48">
            <input
              type="range"
              min="30"
              max="180"
              step="5"
              value={totalMinutes}
              onChange={e => setTotalMinutes(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase mt-1">
              <span>30m</span>
              <span>180m</span>
            </div>
          </div>
          <span className="text-sm font-extrabold text-slate-800 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 min-w-[70px] text-center font-mono">
            {totalMinutes} mins
          </span>
        </div>
      </section>

      {/* Structured List */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Standard Lesson Sequence Plan</h3>
        
        <div className="space-y-4">
          {LESSON_STRUCTURE.map((phase, idx) => {
            const borders = ['border-indigo-400', 'border-emerald-400', 'border-amber-400', 'border-rose-400', 'border-slate-400'];
            const borderColor = borders[idx % borders.length];

            return (
              <div key={idx} className="flex items-start">
                <div className="w-28 flex-shrink-0 pt-1 text-xs font-mono text-slate-500 flex flex-col gap-0.5">
                  <span className="font-bold text-slate-700">{getCalculatedTime(idx)}</span>
                  <span className="text-[10px] text-slate-400">Default: {phase.duration}</span>
                </div>
                <div className={`flex-1 bg-slate-50 p-4 rounded-lg border-l-4 ${borderColor}`}>
                  <p className="text-sm font-bold text-slate-800">{phase.name}</p>
                  <p className="text-xs text-slate-500 mt-1 mb-3">{phase.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Teacher's Strategy</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{phase.teacherRole}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Student Focus</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{phase.studentRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
