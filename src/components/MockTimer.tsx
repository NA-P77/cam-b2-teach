import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Preset {
  name: string;
  durationMinutes: number;
}

const PRESETS: Preset[] = [
  { name: 'Reading & Use of English', durationMinutes: 75 },
  { name: 'Writing', durationMinutes: 80 },
  { name: 'Listening', durationMinutes: 40 },
  { name: 'Speaking (Long Turn Practice)', durationMinutes: 4 },
  { name: 'Speaking (Full Mock)', durationMinutes: 14 }
];

export default function MockTimer() {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].durationMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('60');

  useEffect(() => {
    setTimeLeft(selectedPreset.durationMinutes * 60);
    setIsRunning(false);
  }, [selectedPreset]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedPreset.durationMinutes * 60);
  };

  const handleCustomApply = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      setSelectedPreset({ name: `Custom Timer (${mins} mins)`, durationMinutes: mins });
      setTimeLeft(mins * 60);
      setIsRunning(false);
    }
  };

  // Time formatter
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeLeft / (selectedPreset.durationMinutes * 60)) * 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Settings & Presets */}
        <section className="md:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6 h-fit">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Exam Presets</h3>
            <p className="text-xs text-slate-500 mt-1">Select an official B2 exam section time limit</p>
          </div>

          <div className="space-y-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSelectedPreset(preset)}
                className={`w-full py-2.5 px-3 text-left rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${
                  selectedPreset.name === preset.name
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'bg-slate-50 border-slate-100 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <span>{preset.name}</span>
                <span className={selectedPreset.name === preset.name ? 'text-indigo-200' : 'text-slate-400'}>
                  {preset.durationMinutes} mins
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Custom Duration</h4>
            <form onSubmit={handleCustomApply} className="flex gap-2">
              <input
                type="number"
                min="1"
                max="999"
                value={customMinutes}
                onChange={e => setCustomMinutes(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
                placeholder="Minutes"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold whitespace-nowrap"
              >
                Set Timer
              </button>
            </form>
          </div>
        </section>

        {/* Display Timer */}
        <section className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-between text-center min-h-[380px] text-white">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Mock Exam Session</span>
            <h3 className="text-base font-bold tracking-tight text-white">{selectedPreset.name}</h3>
          </div>

          {/* Core countdown clock */}
          <div className="my-6 space-y-4 w-full max-w-sm">
            <div className="text-6xl font-extrabold font-mono tracking-tight text-white">
              {formatTime(timeLeft)}
            </div>

            {/* Visual Progress bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${
                  progressPercentage > 20 ? 'bg-indigo-500' : 'bg-rose-500 animate-pulse'
                }`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleStartPause}
              disabled={timeLeft === 0}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                isRunning 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-800'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Pause Session' : 'Start Session'}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors text-slate-300"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Status notices */}
          <div className="mt-4">
            {timeLeft === 0 && (
              <p className="text-xs font-bold text-rose-400 flex items-center justify-center gap-1.5 animate-bounce">
                <AlertTriangle className="w-4 h-4" /> Time is up! Pen down.
              </p>
            )}
            {isRunning && (
              <p className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 animate-pulse">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> Exam session in progress
              </p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
