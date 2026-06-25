import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { EXAM_PAPERS } from '../data';

export default function ExamBreakdown() {
  const [showJargonBuster, setShowJargonBuster] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cambridge Terminology Glossary (Jargon Buster) */}
      <section className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cambridge Exam Jargon Buster</h3>
              <p className="text-xs text-slate-500">Quick explanations of Cambridge B2 term formats (like Cloze)</p>
            </div>
          </div>
          <button
            onClick={() => setShowJargonBuster(!showJargonBuster)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
          >
            {showJargonBuster ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showJargonBuster && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 animate-in slide-in-from-top-3 duration-300">
            <div className="bg-slate-50 p-3 rounded-lg space-y-1">
              <p className="font-bold text-slate-800">What is a "Cloze"?</p>
              <p className="leading-relaxed">
                A <strong>cloze</strong> is a text segment where words have been removed (gaps). 
                The candidate must fill in the gaps:
              </p>
              <ul className="list-disc pl-4 space-y-0.5 mt-1 text-slate-500">
                <li><strong>Multiple-choice Cloze (Part 1):</strong> Candidates choose from four options (A, B, C, or D). Tests vocabulary collocations and phrasal verbs.</li>
                <li><strong>Open Cloze (Part 2):</strong> No options. Candidates must write a single correct grammar word (preposition, pronoun, article).</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg space-y-1">
              <p className="font-bold text-slate-800">Key Word Transformations (Part 4)</p>
              <p className="leading-relaxed">
                Candidates receive a complete sentence and a second incomplete sentence. They must rewrite the second sentence using a given "key word" so it means the exact same as the first. Requires between 2 and 5 words.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg space-y-1">
              <p className="font-bold text-slate-800">Gapped Text (Part 6)</p>
              <p className="leading-relaxed">
                A reading text with whole sentences removed. Candidates must choose the correct sentence from a pool to fill the gap. Tests understanding of text cohesion, flow, and reference linkers.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg space-y-1">
              <p className="font-bold text-slate-800">Speaking Part 2 (Long Turn)</p>
              <p className="leading-relaxed">
                Candidates look at two photos and must compare them and answer a question for exactly 1 minute without interruption. Focuses on organization of discourse and speculation.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Grid Layout of Papers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {EXAM_PAPERS.map((paper, idx) => (
          <section key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  {paper.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{paper.description}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1 font-semibold shrink-0">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded">
                  <Clock className="w-3 h-3" />
                  {paper.duration}
                </span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">{paper.parts} Parts</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {paper.breakdown.map((part, pIdx) => (
                <div key={pIdx} className="border border-slate-100 rounded-xl p-4">
                  <p className="text-sm font-bold text-slate-800">{part.part}</p>
                  <p className="text-xs text-slate-500 mt-1">{part.format}</p>
                  <div className="flex items-start gap-2 mt-3 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100/50">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-indigo-950"><span className="font-bold text-indigo-700">Tests:</span> {part.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
