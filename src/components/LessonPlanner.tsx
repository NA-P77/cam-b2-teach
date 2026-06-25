import React, { useState, useEffect } from 'react';
import { CURRICULUM_PLAN } from '../data';
import { Calendar, Printer, Edit2, Check, RefreshCw } from 'lucide-react';

interface CustomPlan {
  title: string;
  warmup: string;
  presentation: string;
  controlledPractice: string;
  freerPractice: string;
  wrapUp: string;
  notes: string;
}

export default function LessonPlanner() {
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(() => {
    const saved = localStorage.getItem('selected_planner_week');
    if (saved) {
      localStorage.removeItem('selected_planner_week');
      const num = parseInt(saved);
      if (!isNaN(num)) return num;
    }
    return 1;
  });
  
  const [pacingMode, setPacingMode] = useState<'A' | 'B'>('A');
  const [isEditing, setIsEditing] = useState(false);
  const [customPlans, setCustomPlans] = useState<Record<string, CustomPlan>>({});

  // Load custom plans from local storage
  useEffect(() => {
    const saved = localStorage.getItem('b2_custom_plans');
    if (saved) {
      try {
        setCustomPlans(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse custom plans', e);
      }
    }
  }, []);

  const activeWeek = CURRICULUM_PLAN.find(w => w.week === selectedWeekNum) || CURRICULUM_PLAN[0];

  // Pre-configured B2 lesson plan templates
  const getPreconfiguredPlan = (weekNum: number, mode: 'A' | 'B'): CustomPlan => {
    // Week A focuses on grammar, vocab and core language introduction
    const plansA: Record<number, CustomPlan> = {
      1: {
        title: 'Introductions, State Verbs & Present Tenses',
        warmup: 'Icebreaker: "Two Truths and a Lie" using Present Simple and Present Continuous. Students identify the lies and discuss in pairs.',
        presentation: 'Explain contrast between Present Simple (habits, states) and Present Continuous (temporary states, actions happening now). Elicit state verbs (love, know, believe) which are rarely used in continuous form.',
        controlledPractice: 'Fill-in-the-gap activity with B2-level text detailing daily routines versus extraordinary project work. E.g., "Usually, I (manage) ___ the marketing, but this week I (work) ___ on a design." ',
        freerPractice: 'Speaking Part 1 Simulation. In pairs, students roleplay examiner and candidate. Asking questions about hobbies, habits, and current projects using target tenses.',
        wrapUp: 'Elicit common state verb errors. Assign writing task: Informal email introducing oneself to a new exchange partner (140-190 words).',
        notes: 'Pay close attention to pronunciation of "continuous" and timing of Speaking Part 1 (2 mins max).',
      },
      2: {
        title: 'Travel Tales & The Perfect Aspect',
        warmup: 'Show pictures of extreme destinations (Antarctica, Sahara). Ask students: "Have you ever been somewhere like this? What would you do there?"',
        presentation: 'Contrast Past Simple (completed past action) with Present Perfect (past action linked to present). Introduce key markers: since, for, already, yet, just.',
        controlledPractice: 'Cambridge Use of English Part 1 practice exercise containing a travel blog. Focus on collocations (e.g., boarding pass, package holiday, set off).',
        freerPractice: 'Roleplay: A traveler recounting their worst journey to a customs officer or friend. Focus on alternating between setting the scene (Past Continuous) and core events (Past Simple/Present Perfect).',
        wrapUp: 'Peer evaluation on collocations. Collect worksheet draft answers for Listening Part 1.',
        notes: 'Remind students that Use of English Part 1 tests vocabulary nuances, not direct translation.',
      },
      3: {
        title: 'Education, Work & Future Writing',
        warmup: 'Quick debate: "Is a university degree necessary to succeed today?" Students list top 3 career skills.',
        presentation: 'Teach Present Perfect Continuous (duration up to now) vs Present Perfect Simple (completed action/quantity). Review "used to" and "would" for past habits.',
        controlledPractice: 'Open Cloze (Part 2) text on the evolution of work-from-home styles. Target prepositions, articles, and auxiliary verb insertions.',
        freerPractice: 'Essay skeleton brainstorming: Write a B2 essay arguing for or against vocational training. Map out 3 body paragraphs and key linking phrases.',
        wrapUp: 'Board run of structural linking words. Homework assignment: full essay draft.',
        notes: 'Reinforce that "would" cannot be used with state verbs for past habits (e.g., NOT "I would have a dog").',
      }
    };

    // Week B focuses on exam drilling, timed mock practice, and exam techniques
    const plansB: Record<number, CustomPlan> = {
      1: {
        title: 'Exam Drilling: Speaking Part 1 & Writing Part 2 Email',
        warmup: 'Review of informal connectors (anyway, by the way, love from). Elicit B2 synonyms for typical adjectives (good -> fantastic, bad -> terrible).',
        presentation: 'Review official Speaking Part 1 criteria: interactive communication and vocabulary range. Explain how to expand answers to prevent 1-word responses.',
        controlledPractice: 'Speed dating drills. Students have 45 seconds to answer random Part 1 questions. Partner rates them on answer extension and grammar control.',
        freerPractice: 'Timed writing simulation. Students write an informal email reply based on a prompt under a 20-minute limit. Exchange papers for peer checklist edits.',
        wrapUp: 'Highlight 3 major punctuation errors observed during timed writing. Review common spelling traps.',
        notes: 'Emphasize that the email format must feel natural, utilizing correct opening and closing expressions.',
      },
      2: {
        title: 'Exam Drilling: Reading Part 1 (Multiple-choice) & Listening Part 1',
        warmup: 'Synonyms brainstorming race. Write 5 travel verbs on board; students list phrasal equivalents.',
        presentation: 'Explain FCE Reading Part 1 distractor techniques: options often look similar but only one fits the precise preposition collocating with it.',
        controlledPractice: 'Run a timed Reading Part 1 practice test (8 questions, 10 mins). Grade as a class, highlighting why wrong options are incorrect.',
        freerPractice: 'Listening Part 1 mock exercise. Play clips twice. Elicit cues showing speaker attitude or feeling before checking the answer key.',
        wrapUp: 'Peer vocabulary test on boarding and airport collocations.',
        notes: 'Remind students to read the entire sentence before choosing a gap option; sometimes the clue is 3 words away.',
      },
      3: {
        title: 'Exam Drilling: UoE Part 2 (Open Cloze) & Writing Part 1 Essay',
        warmup: 'Write 8 sentences missing prepositions on the board. Students write answers in a 2-minute sprint.',
        presentation: 'Explain Open Cloze patterns: missing words are almost always grammar words (prepositions, articles, pronouns, relative pronouns).',
        controlledPractice: 'Timed Open Cloze mock task (8 questions, 8 mins). Analyze errors individually and classify them (e.g. grammar vs vocabulary).',
        freerPractice: 'Timed Writing Part 1 Essay block. Students compose their core essay body paragraphs based on week 3 notes under a timed 30-minute block.',
        wrapUp: 'Verify essay word budget targets (140-190 words). Correct sentence cohesion linking errors.',
        notes: 'Penalize essays that are over 200 words, as excessive length usually indicates wordy sentences.',
      }
    };

    const defaultPlanA: CustomPlan = {
      title: `${activeWeek.theme} - Language Foundation`,
      warmup: `Interactive team brainstorm on the topic: "${activeWeek.theme}". List 10 key terms on board.`,
      presentation: `Introduce grammar concept: "${activeWeek.grammar.join(', ')}". Focus on form, usage criteria, and B2 expectations.`,
      controlledPractice: `Grammar and vocabulary drills. Students complete fill-in-the-gaps and sentence builds matching target structures.`,
      freerPractice: `Interactive group activity (discussion, roleplay, or game) putting vocabulary and target grammar into action.`,
      wrapUp: 'Class error correction. Collect common mistakes, review performance targets, and assign homework.',
      notes: 'Ensure students are checking spelling and using correct tenses.',
    };

    const defaultPlanB: CustomPlan = {
      title: `${activeWeek.theme} - Exam Drilling`,
      warmup: `Review the exam paper format being practiced today. Quick review of key terminology.`,
      presentation: `Explain specific strategy and common examiner traps for "${activeWeek.examFocus.join(' / ')}".`,
      controlledPractice: `Timed practice drill of "${activeWeek.examFocus[0]}" under simulated exam conditions.`,
      freerPractice: `Detailed analysis of answers, peer grading, and mock review of students' attempts.`,
      wrapUp: 'Reflective discussion on timing strategies and common traps to avoid.',
      notes: 'Remind students to focus on timing constraints.',
    };

    if (mode === 'B') {
      return plansB[weekNum] || defaultPlanB;
    }
    return plansA[weekNum] || defaultPlanA;
  };

  const planKey = `${selectedWeekNum}-${pacingMode}`;
  const currentPlan = customPlans[planKey] || getPreconfiguredPlan(selectedWeekNum, pacingMode);

  const handleUpdateField = (field: keyof CustomPlan, val: string) => {
    const updated = {
      ...customPlans,
      [planKey]: {
        ...currentPlan,
        [field]: val
      }
    };
    setCustomPlans(updated);
    localStorage.setItem('b2_custom_plans', JSON.stringify(updated));
  };

  const handleReset = () => {
    if (window.confirm('Reset this lesson plan to default content?')) {
      const updated = { ...customPlans };
      delete updated[planKey];
      setCustomPlans(updated);
      localStorage.setItem('b2_custom_plans', JSON.stringify(updated));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl print:bg-white print:p-0">
      
      {/* Selector & Pacing Toggle Actions */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-800">Lesson Plan Dashboard</h3>
            <p className="text-xs text-slate-500">Generate, customize, and print B2 class plans</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {/* Week Selector */}
          <select
            value={selectedWeekNum}
            onChange={(e) => {
              setSelectedWeekNum(Number(e.target.value));
              setIsEditing(false);
            }}
            className="border border-slate-200 rounded-lg text-xs px-3 py-2 outline-none focus:border-indigo-500 bg-white font-semibold"
          >
            {CURRICULUM_PLAN.map(w => (
              <option key={w.week} value={w.week}>Week {w.week}: {w.theme}</option>
            ))}
          </select>

          {/* Week A / B pacing split toggles */}
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => { setPacingMode('A'); setIsEditing(false); }}
              className={`px-3 py-1 rounded font-bold transition-all ${
                pacingMode === 'A' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Week A (Language)
            </button>
            <button
              onClick={() => { setPacingMode('B'); setIsEditing(false); }}
              className={`px-3 py-1 rounded font-bold transition-all ${
                pacingMode === 'B' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Week B (Exam Drill)
            </button>
          </div>

          {/* Edit / Save / Print Controls */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isEditing 
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
            {isEditing ? 'Save Edits' : 'Edit Plan'}
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-indigo-100 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / PDF
          </button>
        </div>
      </div>

      {/* Main Printable Plan Sheet */}
      <article className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-8 space-y-6 print:border-none print:shadow-none print:p-0">
        
        {/* Plan Header */}
        <header className="border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1.5">
            <span>B2 First Lesson Plan</span>
            <span>•</span>
            <span>Week {selectedWeekNum} ({pacingMode === 'A' ? 'Week A: Core Language' : 'Week B: Exam Tactics'})</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            {isEditing ? (
              <input
                type="text"
                value={currentPlan.title}
                onChange={e => handleUpdateField('title', e.target.value)}
                className="text-2xl font-extrabold text-slate-800 border-b border-indigo-300 outline-none w-full max-w-xl pb-1"
              />
            ) : (
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{currentPlan.title}</h2>
            )}
            <div className="text-xs text-slate-400 font-medium">Recommended Duration: 90 Minutes</div>
          </div>
        </header>

        {/* Overview targets */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Theme Focus</span>
            <span className="text-xs font-semibold text-slate-700 mt-1 block">{activeWeek.theme}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {pacingMode === 'A' ? 'Grammar Target' : 'Pacing Focus'}
            </span>
            <span className="text-xs font-semibold text-slate-700 mt-1 block">
              {pacingMode === 'A' ? (activeWeek.grammar.join(', ') || 'General Review') : 'Exam Speed & Time Strategy'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Exam Part Focus</span>
            <span className="text-xs font-semibold text-slate-700 mt-1 block">
              {pacingMode === 'A' ? activeWeek.examFocus[0] : activeWeek.examFocus.join(', ')}
            </span>
          </div>
        </section>

        {/* Phase Breakdown */}
        <div className="space-y-6">
          
          {/* Phase 1: Warm up */}
          <div className="border-l-4 border-indigo-500 pl-4 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-800">1. Warm-up / Lead-in</h4>
              <span className="text-xs text-slate-400 font-mono">5-10 Mins</span>
            </div>
            {isEditing ? (
              <textarea
                value={currentPlan.warmup}
                onChange={e => handleUpdateField('warmup', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-2 outline-none focus:border-indigo-500 h-20"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{currentPlan.warmup}</p>
            )}
          </div>

          {/* Phase 2: Teach/Present */}
          <div className="border-l-4 border-emerald-500 pl-4 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-800">2. Presentation / Explicit Teaching</h4>
              <span className="text-xs text-slate-400 font-mono">15-20 Mins</span>
            </div>
            {isEditing ? (
              <textarea
                value={currentPlan.presentation}
                onChange={e => handleUpdateField('presentation', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-2 outline-none focus:border-indigo-500 h-20"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{currentPlan.presentation}</p>
            )}
          </div>

          {/* Phase 3: Controlled Practice */}
          <div className="border-l-4 border-amber-500 pl-4 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-800">3. Controlled Practice Drill</h4>
              <span className="text-xs text-slate-400 font-mono">15-20 Mins</span>
            </div>
            {isEditing ? (
              <textarea
                value={currentPlan.controlledPractice}
                onChange={e => handleUpdateField('controlledPractice', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-2 outline-none focus:border-indigo-500 h-20"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{currentPlan.controlledPractice}</p>
            )}
          </div>

          {/* Phase 4: Freer Practice */}
          <div className="border-l-4 border-rose-500 pl-4 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-800">4. Freer Practice & Production</h4>
              <span className="text-xs text-slate-400 font-mono">25-30 Mins</span>
            </div>
            {isEditing ? (
              <textarea
                value={currentPlan.freerPractice}
                onChange={e => handleUpdateField('freerPractice', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-2 outline-none focus:border-indigo-500 h-20"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{currentPlan.freerPractice}</p>
            )}
          </div>

          {/* Phase 5: Wrap up */}
          <div className="border-l-4 border-slate-500 pl-4 space-y-1.5">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-800">5. Wrap-up & Delay Correction</h4>
              <span className="text-xs text-slate-400 font-mono">10 Mins</span>
            </div>
            {isEditing ? (
              <textarea
                value={currentPlan.wrapUp}
                onChange={e => handleUpdateField('wrapUp', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded p-2 outline-none focus:border-indigo-500 h-20"
              />
            ) : (
              <p className="text-xs text-slate-600 leading-relaxed">{currentPlan.wrapUp}</p>
            )}
          </div>

        </div>

        {/* Private Teacher Notes */}
        <section className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Teacher Private Notes / Key Reminders</h4>
          {isEditing ? (
            <textarea
              value={currentPlan.notes}
              onChange={e => handleUpdateField('notes', e.target.value)}
              className="w-full text-xs border border-indigo-200 bg-white rounded p-2 outline-none focus:border-indigo-500 h-20"
            />
          ) : (
            <p className="text-xs text-indigo-900 leading-relaxed font-medium italic">{currentPlan.notes}</p>
          )}
        </section>

      </article>

    </div>
  );
}
