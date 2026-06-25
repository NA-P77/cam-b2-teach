import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Award, TrendingUp, AlertTriangle, CheckCircle, Upload } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  readingScore: number; // Max 80
  writingScore: number; // Max 40
  listeningScore: number; // Max 30
  speakingScore: number; // Max 60
}

export default function ClassTracker() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [newReading, setNewReading] = useState(9);
  const [newWriting, setNewWriting] = useState(9);
  const [newListening, setNewListening] = useState(9);
  const [newSpeaking, setNewSpeaking] = useState(9);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('b2_class_students');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse students', e);
      }
    }
  }, []);

  const saveStudents = (updated: Student[]) => {
    setStudents(updated);
    localStorage.setItem('b2_class_students', JSON.stringify(updated));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newStudent: Student = {
      id: Date.now().toString(),
      name: newName.trim(),
      readingScore: Number(newReading),
      writingScore: Number(newWriting),
      listeningScore: Number(newListening),
      speakingScore: Number(newSpeaking),
    };

    const updated = [...students, newStudent];
    saveStudents(updated);
    setNewName('');
    setNewReading(9);
    setNewWriting(9);
    setNewListening(9);
    setNewSpeaking(9);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    saveStudents(updated);
  };

  const handleLoadDemo = () => {
    const initial: Student[] = [
      { id: '1', name: 'Sophia Miller', readingScore: 68, writingScore: 32, listeningScore: 24, speakingScore: 52 },
      { id: '2', name: 'Liam Johnson', readingScore: 48, writingScore: 22, listeningScore: 16, speakingScore: 36 },
      { id: '3', name: 'Emma Davis', readingScore: 72, writingScore: 35, listeningScore: 27, speakingScore: 54 },
    ];
    saveStudents(initial);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all students?")) {
      saveStudents([]);
    }
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        const incoming = Array.isArray(data) ? data : [data];
        const newStudents: Student[] = [];

        incoming.forEach((item: any, index: number) => {
          if (item && typeof item === 'object' && item.name) {
            newStudents.push({
              id: (Date.now() + index).toString(),
              name: String(item.name),
              readingScore: Math.min(80, Math.max(0, Number(item.readingScore) || 0)),
              writingScore: Math.min(40, Math.max(0, Number(item.writingScore) || 0)),
              listeningScore: Math.min(30, Math.max(0, Number(item.listeningScore) || 0)),
              speakingScore: Math.min(60, Math.max(0, Number(item.speakingScore) || 0))
            });
          }
        });

        if (newStudents.length > 0) {
          const updated = [...students, ...newStudents];
          saveStudents(updated);
          alert(`Successfully imported ${newStudents.length} student record(s)!`);
        } else {
          alert("No valid student records found in the JSON file. Ensure fields match: name, readingScore, writingScore, listeningScore, speakingScore.");
        }
      } catch (err) {
        alert("Failed to parse JSON file. Please ensure it is a valid JSON array or object.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Calculations
  const totalStudents = students.length;
  
  const getAverage = (field: keyof Omit<Student, 'id' | 'name'>) => {
    if (totalStudents === 0) return 0;
    const sum = students.reduce((acc, s) => acc + s[field], 0);
    return Math.round((sum / totalStudents) * 10) / 10;
  };

  const avgReading = getAverage('readingScore');
  const avgWriting = getAverage('writingScore');
  const avgListening = getAverage('listeningScore');
  const avgSpeaking = getAverage('speakingScore');

  // Percentage scores
  const avgReadingPct = totalStudents > 0 ? Math.round((avgReading / 80) * 100) : 0;
  const avgWritingPct = totalStudents > 0 ? Math.round((avgWriting / 40) * 100) : 0;
  const avgListeningPct = totalStudents > 0 ? Math.round((avgListening / 30) * 100) : 0;
  const avgSpeakingPct = totalStudents > 0 ? Math.round((avgSpeaking / 60) * 100) : 0;

  // Determine weak areas
  const scoresArray = [
    { name: 'Reading & Use of English', percentage: avgReadingPct, rawAvg: avgReading, max: 80, id: 'reading' },
    { name: 'Writing', percentage: avgWritingPct, rawAvg: avgWriting, max: 40, id: 'writing' },
    { name: 'Listening', percentage: avgListeningPct, rawAvg: avgListening, max: 30, id: 'listening' },
    { name: 'Speaking', percentage: avgSpeakingPct, rawAvg: avgSpeaking, max: 60, id: 'speaking' },
  ];

  const sortedByWeakness = [...scoresArray].sort((a, b) => a.percentage - b.percentage);
  const weakestArea = totalStudents > 0 ? sortedByWeakness[0] : null;

  // Recommendations mapping
  const recommendations: Record<string, { issue: string; actions: string[] }> = {
    reading: {
      issue: 'Reading & Use of English is the weakest section.',
      actions: [
        'Run 10-minute daily drills on Part 4 (Key Word Transformations) which carries double marks.',
        'Use the suffix/prefix training boards to bolster Word Formation (Part 3) performance.',
        'Encourage students to read articles for global comprehension (skimming) to assist in Part 5 & 6.',
      ]
    },
    writing: {
      issue: 'Writing is currently trailing behind standard B2 requirements.',
      actions: [
        'Conduct a dedicated session on structural linking words (In addition, Nevertheless, Consequently).',
        'Have students peer-review each other\'s essays using the official Cambridge Assessment Scale criteria.',
        'Practice time-blocked Writing Part 1 outlines: 10 minutes planning, 25 minutes writing.',
      ]
    },
    listening: {
      issue: 'Listening scores are low, suggesting difficulty with distractors or accents.',
      actions: [
        'Teach students to identify synonyms in Listening Part 1; they will rarely hear the exact word from the option choices.',
        'Play monologues and have students write down key content words to strengthen Part 2 (Sentence Completion).',
        'Integrate listening activities with native accents (BBC Podcasts, TED talks) weekly.',
      ]
    },
    speaking: {
      issue: 'Speaking fluency, comparison structures, or collaborative phrasing needs reinforcement.',
      actions: [
        'Use the Speaking Part 2 photos simulator frequently so students build a natural habit of comparing rather than describing.',
        'Provide a "Speaking Cheat Sheet" of essential interaction phrases (What\'s your take on...?, I see your point, but...).',
        'Pair weak speakers with confident speakers for collaborative simulation exercises.',
      ]
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Total Students</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{totalStudents}</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Reading & UoE Avg</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{avgReadingPct}%</p>
            <p className="text-[10px] text-slate-500 mt-1">{avgReading} / 80 pts</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-slate-700">
            {totalStudents > 0 && avgReadingPct >= 60 ? 'B2' : 'B1'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Writing Avg</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{avgWritingPct}%</p>
            <p className="text-[10px] text-slate-500 mt-1">{avgWriting} / 40 pts</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center font-bold text-slate-700">
            {totalStudents > 0 && avgWritingPct >= 60 ? 'B2' : 'B1'}
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Class Weakest Link</p>
            <p className="text-lg font-extrabold text-rose-600 mt-1 truncate max-w-[150px]">
              {weakestArea ? weakestArea.name : 'N/A'}
            </p>
            <p className="text-[10px] text-slate-500 mt-1">{weakestArea ? `${weakestArea.percentage}% class average` : 'No data'}</p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recommendations & Action Plan */}
      {weakestArea && recommendations[weakestArea.id] && (
        <section className="bg-indigo-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row gap-6 items-start">
          <div className="p-3 bg-indigo-800 text-indigo-200 rounded-xl shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-300" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-base font-bold tracking-tight text-white">Recommended Class Action Plan</h3>
            <p className="text-sm text-indigo-200 font-medium">{recommendations[weakestArea.id].issue}</p>
            <ul className="space-y-2 mt-4">
              {recommendations[weakestArea.id].actions.map((act, i) => (
                <li key={i} className="text-xs text-indigo-100 flex items-start gap-2 bg-indigo-800/40 p-2.5 rounded-lg border-l-4 border-emerald-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Grid of Add Student and List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Form */}
        <section className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm h-fit space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Add Student Score</h3>
            <p className="text-xs text-slate-500">Insert mock marks individually</p>
          </div>

          <form onSubmit={handleAddStudent} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Student Name</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 outline-none focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Reading & Use of English ({newReading} / 80)</label>
              <input
                type="range"
                min="0"
                max="80"
                value={newReading}
                onChange={e => setNewReading(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Writing ({newWriting} / 40)</label>
              <input
                type="range"
                min="0"
                max="40"
                value={newWriting}
                onChange={e => setNewWriting(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Listening ({newListening} / 30)</label>
              <input
                type="range"
                min="0"
                max="30"
                value={newListening}
                onChange={e => setNewListening(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Speaking ({newSpeaking} / 60)</label>
              <input
                type="range"
                min="0"
                max="60"
                value={newSpeaking}
                onChange={e => setNewSpeaking(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </form>

          {/* Import JSON file trigger */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase">Import Scores JSON</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Upload a JSON array with student scores</p>
            </div>
            
            <label className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" /> Select JSON File
              <input
                type="file"
                accept=".json"
                onChange={handleJsonUpload}
                className="hidden"
              />
            </label>
          </div>
        </section>

        {/* Student Records List */}
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center flex-wrap gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Student Records</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Class Average target benchmark: &gt;= 60% per paper</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleLoadDemo} 
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
              >
                Load Demo Class
              </button>
              <button 
                onClick={handleClearAll} 
                className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-all"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3 text-center">Reading & UoE</th>
                  <th className="px-6 py-3 text-center">Writing</th>
                  <th className="px-6 py-3 text-center">Listening</th>
                  <th className="px-6 py-3 text-center">Speaking</th>
                  <th className="px-6 py-3 text-center">Avg %</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {students.map((student) => {
                  const rPct = Math.round((student.readingScore / 80) * 100);
                  const wPct = Math.round((student.writingScore / 40) * 100);
                  const lPct = Math.round((student.listeningScore / 30) * 100);
                  const sPct = Math.round((student.speakingScore / 60) * 100);
                  const averagePct = Math.round((rPct + wPct + lPct + sPct) / 4);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-800">{student.name}</td>
                      
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-slate-700">{student.readingScore} <span className="text-[10px] text-slate-400">/80</span></span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1 ${rPct >= 60 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{rPct}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-slate-700">{student.writingScore} <span className="text-[10px] text-slate-400">/40</span></span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1 ${wPct >= 60 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{wPct}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-slate-700">{student.listeningScore} <span className="text-[10px] text-slate-400">/30</span></span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1 ${lPct >= 60 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{lPct}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-bold text-slate-700">{student.speakingScore} <span className="text-[10px] text-slate-400">/60</span></span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold mt-1 ${sPct >= 60 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{sPct}%</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${averagePct >= 60 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                          {averagePct}%
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {students.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                      No student records found. Upload a scores JSON file or load the Demo Class to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
