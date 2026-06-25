import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, Target, Info, Calendar, X, ExternalLink, ArrowRight } from 'lucide-react';
import { CURRICULUM_PLAN } from '../data';

interface CurriculumMapProps {
  onNavigateToPlanner: (weekNum: number) => void;
}

interface ResourceLink {
  name: string;
  url: string;
}

// Week-specific learning resource mapping
const WEEK_RESOURCES: Record<number, ResourceLink[]> = {
  1: [
    { name: 'Present Tenses Practice Exercises', url: 'https://www.perfect-english-grammar.com/present-simple-present-continuous-1.html' },
    { name: 'Informal Email Structure Guide', url: 'https://www.flo-joe.co.uk/fce/students/writing/email/index.htm' }
  ],
  2: [
    { name: 'Past Simple vs Present Perfect Exercises', url: 'https://www.perfect-english-grammar.com/past-simple-present-perfect-1.html' },
    { name: 'FCE Listening Part 1 Tips', url: 'https://www.flo-joe.co.uk/fce/students/tests/listening-part-1.htm' }
  ],
  3: [
    { name: 'Used To vs Would Grammar Rules', url: 'https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/used-to-infinite-would-infinite-past-simple' },
    { name: 'Cambridge Essay Structure Template', url: 'https://www.writeandimprove.com/' }
  ],
  4: [
    { name: 'Word Formation Prefixes & Suffixes Chart', url: 'https://www.englishprofile.org/' },
    { name: 'Speaking Part 2 Photo Comparison Strategy', url: 'https://www.flo-joe.co.uk/fce/students/tests/speaking-part-2.htm' }
  ],
  5: [
    { name: 'Zero, First & Second Conditionals Quiz', url: 'https://www.perfect-english-grammar.com/conditionals.html' },
    { name: 'Listening Part 2 Sentence Completion Drills', url: 'https://www.flo-joe.co.uk/fce/students/tests/listening-part-2.htm' }
  ],
  6: [
    { name: 'Wish and If Only Explainer', url: 'https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/wish-and-if-only' },
    { name: 'How to Write an Engaging B2 Article', url: 'https://www.flo-joe.co.uk/fce/students/writing/article/index.htm' }
  ],
  7: [
    { name: 'Passive Voice Tenses Chart & Exercises', url: 'https://www.perfect-english-grammar.com/passive.html' },
    { name: 'Collaborative Speaking Task (Part 3) Phrases', url: 'https://www.flo-joe.co.uk/fce/students/tests/speaking-part-3.htm' }
  ],
  8: [
    { name: 'Reported Speech Converter Rules', url: 'https://www.perfect-english-grammar.com/reported-speech.html' },
    { name: 'Speaking Part 4 Discussion Prompts', url: 'https://www.flo-joe.co.uk/fce/students/tests/speaking-part-4.htm' }
  ],
  9: [
    { name: 'Modals of Past Deduction Practice', url: 'https://learnenglish.britishcouncil.org/grammar/intermediate-to-upper-intermediate/modals-deduction-about-past' },
    { name: 'B2 Formal Report Formatting Guidelines', url: 'https://www.flo-joe.co.uk/fce/students/writing/report/index.htm' }
  ],
  10: [
    { name: 'Gerund vs Infinitive Verb List', url: 'https://www.perfect-english-grammar.com/gerunds-and-infinitives.html' },
    { name: 'Multiple Matching (Part 7) Reading Tactics', url: 'https://www.flo-joe.co.uk/fce/students/tests/reading-part-7.htm' }
  ],
  11: [
    { name: 'Cambridge Official B2 Sample Papers (Free Download)', url: 'https://www.cambridgeenglish.org/exams-and-tests/first/preparation/' },
    { name: 'Timed Mock Test Evaluation Checklist', url: 'https://writeandimprove.com/' }
  ],
  12: [
    { name: 'Top 100 FCE Phrasal Verbs Index', url: 'https://www.flo-joe.co.uk/fce/students/vocabulary/phrasal-verbs.htm' },
    { name: 'Final Exam Day Timing Strategies', url: 'https://www.cambridgeenglish.org/exams-and-tests/first/preparation/' }
  ]
};

export default function CurriculumMap({ onNavigateToPlanner }: CurriculumMapProps) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [showPacingGuide, setShowPacingGuide] = useState(false);
  const [selectedWeekNum, setSelectedWeekNum] = useState<number | null>(null);

  // Load completed weeks from local storage
  useEffect(() => {
    const saved = localStorage.getItem('b2_completed_weeks');
    if (saved) {
      try {
        setCompletedWeeks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse completed weeks', e);
      }
    }
  }, []);

  const toggleWeekCompleted = (weekNum: number) => {
    const updated = completedWeeks.includes(weekNum)
      ? completedWeeks.filter(w => w !== weekNum)
      : [...completedWeeks, weekNum];
    
    setCompletedWeeks(updated);
    localStorage.setItem('b2_completed_weeks', JSON.stringify(updated));
  };

  const percentComplete = Math.round((completedWeeks.length / CURRICULUM_PLAN.length) * 100);

  const activeModalWeek = CURRICULUM_PLAN.find(w => w.week === selectedWeekNum);
  const activeResources = selectedWeekNum ? (WEEK_RESOURCES[selectedWeekNum] || []) : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      
      {/* Pacing Guide & Progress Header */}
      <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Curriculum Progress Dashboard</h2>
            <p className="text-xs text-slate-500">Track week-by-week coverage of the B2 curriculum map</p>
          </div>

          <button
            onClick={() => setShowPacingGuide(!showPacingGuide)}
            className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            {showPacingGuide ? 'Hide Pacing Guide' : '6-Month Pacing Guide'}
          </button>
        </div>

        {/* Expandable Pacing Guide for 6-Month Course */}
        {showPacingGuide && (
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 text-xs text-indigo-950 space-y-3 animate-in slide-in-from-top-3 duration-300">
            <h3 className="font-bold flex items-center gap-1 text-indigo-900">
              <Calendar className="w-4 h-4 text-indigo-600" /> Stretching to 6 Months (24 Weeks)
            </h3>
            <p className="leading-relaxed">
              If your course runs for 6 months, you can stretch this core 12-week roadmap to cover 2 weeks per themed module. 
              Here is the recommended 2-week block pacing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5 font-medium">
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-indigo-700 block mb-0.5">Week A: Foundation & Language Range</span>
                Focus entirely on the Theme vocabulary, Grammar presentation, and structured drilling. Do not time activities; emphasize depth of comprehension and sentence accuracy.
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-indigo-700 block mb-0.5">Week B: Exam Tactics & Timed Production</span>
                Focus entirely on the Week's Exam Focus paper sections. Run timed simulations (e.g. Speaking timers, Transformation exercises) and conduct writing peer review drafts.
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>{completedWeeks.length} of {CURRICULUM_PLAN.length} Modules Completed</span>
            <span>{percentComplete}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Grid of Weeks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURRICULUM_PLAN.map((week) => {
          const isDone = completedWeeks.includes(week.week);

          return (
            <section 
              key={week.week} 
              onClick={() => setSelectedWeekNum(week.week)}
              className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all duration-300 ${
                isDone ? 'border-emerald-200 bg-emerald-50/10 shadow-emerald-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    Wk {week.week}
                  </span>
                  <span className="truncate text-slate-700 font-semibold">{week.theme}</span>
                </h3>
                
                <input
                  type="checkbox"
                  checked={isDone}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleWeekCompleted(week.week)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                  title="Mark week as completed"
                />
              </div>
              
              <div className="space-y-5 flex-1">
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                    <ChevronRight className="w-3 h-3 text-indigo-400" /> Grammar
                  </h4>
                  <div className="space-y-1.5">
                    {week.grammar.map((g, i) => (
                      <div key={i} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                        <span className="text-indigo-400 mt-1">•</span>
                        {g}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-emerald-400" /> Exam Focus
                  </h4>
                  <div className="space-y-1.5">
                    {week.examFocus.map((e, i) => (
                      <div key={i} className="text-xs font-medium text-slate-600 flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Week Details Expansion Modal */}
      {activeModalWeek && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Week {activeModalWeek.week} Modules Details</span>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5">{activeModalWeek.theme}</h3>
              </div>
              <button 
                onClick={() => setSelectedWeekNum(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Detailed Core Objectives */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Student Objectives</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeModalWeek.objectives.map((obj, i) => (
                    <div key={i} className="text-xs text-slate-600 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border-l-4 border-indigo-500">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Links */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Week-Specific Teaching Resources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeResources.map(link => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-between transition-all group"
                    >
                      <span className="group-hover:text-indigo-600">{link.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                    </a>
                  ))}
                  {activeResources.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No external resource links mapped for this module review week.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-slate-100 flex justify-between items-center bg-slate-50 rounded-b-2xl">
              <button 
                onClick={() => setSelectedWeekNum(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Close Details
              </button>

              <button
                onClick={() => {
                  setSelectedWeekNum(null);
                  onNavigateToPlanner(activeModalWeek.week);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 flex items-center gap-1.5 transition-colors"
              >
                Go to Lesson Planner <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
