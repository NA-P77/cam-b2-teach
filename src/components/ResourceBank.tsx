import { useState } from 'react';
import { BookOpen, Users, Compass, Layers, CheckCircle2, Clipboard } from 'lucide-react';

export default function ResourceBank() {
  const [activeSubTab, setActiveSubTab] = useState<'transformations' | 'word-formation' | 'speaking' | 'writing' | 'reading-listening'>('transformations');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      
      {/* Selector Tabs */}
      <nav className="flex flex-wrap border-b border-slate-200 gap-4 md:gap-6">
        {[
          { id: 'transformations', label: 'Teaching Transformations' },
          { id: 'word-formation', label: 'Teaching Word Formation' },
          { id: 'speaking', label: 'Speaking Game Suggestions' },
          { id: 'writing', label: 'Writing Handouts' },
          { id: 'reading-listening', label: 'Reading & Listening Guides' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeSubTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Transformations Section */}
      {activeSubTab === 'transformations' && (
        <article className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <Compass className="w-4 h-4" /> Lesson Guide & Exercises: Key Word Transformations (Part 4)
            </h3>
            <p className="text-xs text-indigo-900 mt-2 leading-relaxed">
              Part 4 tests grammatical structure transformation within a strict word budget (2 to 5 words). 
              Use the classroom drill questions below to practice with your students.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready-Made Classroom Worksheet</h4>
              
              <div className="space-y-3">
                {[
                  {
                    qNum: "1",
                    original: "We haven't seen each other for five years.",
                    key: "LAST",
                    prompt: "It ................................................... five years since we last saw each other.",
                    ans: "has been"
                  },
                  {
                    qNum: "2",
                    original: "The bridge was closed due to the strong wind.",
                    key: "BECAUSE",
                    prompt: "The bridge was closed ................................................... blew strongly.",
                    ans: "because the wind"
                  },
                  {
                    qNum: "3",
                    original: "I'm sure Jack didn't forget the keys on purpose.",
                    key: "ACCIDENT",
                    prompt: "I'm sure Jack left the keys ...................................................",
                    ans: "by accident"
                  },
                  {
                    qNum: "4",
                    original: "You should not turn off the computer under any circumstances.",
                    key: "NO",
                    prompt: "Under ................................................... turn off the computer.",
                    ans: "no circumstances should you"
                  }
                ].map(item => (
                  <div key={item.qNum} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm relative group">
                    <button
                      onClick={() => triggerCopy(`${item.original}\nKey: ${item.key}\n${item.prompt}\nAnswer: ${item.ans}`, `t-${item.qNum}`)}
                      className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {copiedId === `t-${item.qNum}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] font-bold text-indigo-600">Exercise {item.qNum}</span>
                    <p className="text-xs text-slate-700 italic mt-1 font-medium">"{item.original}"</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono uppercase">{item.key}</span>
                      <p className="text-xs font-semibold text-slate-800">{item.prompt}</p>
                    </div>
                    <p className="text-[11px] text-emerald-600 mt-2 font-bold bg-emerald-50/50 px-2 py-1 rounded w-fit">Answer Key: {item.ans}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classroom Activity: "Transformation Relay"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Divide the class into teams. Write an original sentence and a keyword on the board. One student from each team runs to the board to write their answer. The first team to write a grammatically correct transformation within the 2-5 word limit wins the round.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-500 text-xs">
                <span className="font-bold text-slate-700">Teacher Tip:</span> Remind students that contracted words (e.g. "don't") count as two words. Contraction errors are the most common reason students lose marks here.
              </div>
            </section>
          </div>
        </article>
      )}

      {/* Word Formation Section */}
      {activeSubTab === 'word-formation' && (
        <article className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Lesson Guide & Exercises: Word Formation (Part 3)
            </h3>
            <p className="text-xs text-emerald-900 mt-2 leading-relaxed">
              Part 3 requires students to identify whether a word should be a noun, verb, adjective, or adverb, and change the root word accordingly. Misspelled modifications receive no points.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready-Made Vocabulary Drills</h4>
              <div className="space-y-3">
                {[
                  {
                    id: "1",
                    sentence: "The sudden (DECIDE) ........................................ to cancel the concert shocked the fans.",
                    word: "DECIDE",
                    type: "Noun",
                    ans: "decision"
                  },
                  {
                    id: "2",
                    sentence: "It was a very (PAIN) ........................................ experience but they recovered quickly.",
                    word: "PAIN",
                    type: "Adjective",
                    ans: "painful"
                  },
                  {
                    id: "3",
                    sentence: "His actions were completely (RESPONSIBLE) ........................................ and caused a lot of trouble.",
                    word: "RESPONSIBLE",
                    type: "Negative Adjective",
                    ans: "irresponsible"
                  },
                  {
                    id: "4",
                    sentence: "Technology has (SOCIETY) ........................................ changed the way we communicate.",
                    word: "SOCIETY",
                    type: "Adverb",
                    ans: "socially"
                  }
                ].map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm relative group">
                    <button
                      onClick={() => triggerCopy(`${item.sentence}\nRoot: ${item.word}\nAnswer: ${item.ans}`, `wf-${item.id}`)}
                      className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {copiedId === `wf-${item.id}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] font-bold text-emerald-600">Exercise {item.id} ({item.type})</span>
                    <p className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">{item.sentence}</p>
                    <p className="text-[11px] text-emerald-600 mt-2 font-bold bg-emerald-50/50 px-2 py-1 rounded w-fit">Answer Key: {item.ans}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classroom Activity: "Affix Grid Relay"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Draw a matrix of prefixes (un-, in-, dis-, im-) and suffixes (-ment, -ness, -ation, -ity) on the board. Provide root words and have student groups draft correct word cards on the fly.
              </p>
              <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-emerald-500 text-xs">
                <span className="font-bold text-slate-700">Teacher Tip:</span> Remind students to analyze the context of the sentence to see if a negative form is needed (e.g. honest &rarr; dishonest).
              </div>
            </section>
          </div>
        </article>
      )}

      {/* Speaking Game Section */}
      {activeSubTab === 'speaking' && (
        <article className="space-y-6">
          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Lesson Guide & Prompts: Speaking Part 2
            </h3>
            <p className="text-xs text-amber-900 mt-2 leading-relaxed">
              Drill the layout of the Speaking Part 2 examination. Candidates must compare two photographs and address a specific target question.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready-Made Speaking Prompts</h4>
              
              <div className="space-y-3">
                {[
                  {
                    id: "1",
                    topic: "Study Locations",
                    prompt: "Compare the photographs and say why you think the people have chosen to study in these environments.",
                    desc1: "Picture 1: A student studying alone in a quiet, modern library.",
                    desc2: "Picture 2: A group of students collaborating in a noisy, outdoor coffee shop."
                  },
                  {
                    id: "2",
                    topic: "Travel Situations",
                    prompt: "Compare the photographs and say how you think the people are feeling in these situations.",
                    desc1: "Picture 1: A family stuck in heavy traffic during a holiday commute.",
                    desc2: "Picture 2: A solo backpacker taking a break to watch a mountain sunset."
                  }
                ].map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm relative group">
                    <button
                      onClick={() => triggerCopy(`Topic: ${item.topic}\nPrompt: ${item.prompt}\n${item.desc1}\n${item.desc2}`, `spk-${item.id}`)}
                      className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {copiedId === `spk-${item.id}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] font-bold text-amber-600">Speaking Topic: {item.topic}</span>
                    <p className="text-xs font-bold text-slate-800 mt-1">"{item.prompt}"</p>
                    <div className="mt-2 text-xs text-slate-500 space-y-1 italic">
                      <p>{item.desc1}</p>
                      <p>{item.desc2}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classroom Activity: "The Contrast Challenge"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Put students in pairs. Give them two unrelated photos. They must talk for one minute comparing them, but they *must* use at least three linking words of contrast (whereas, on the other hand, while, in contrast).
              </p>
            </section>
          </div>
        </article>
      )}

      {/* Writing Section */}
      {activeSubTab === 'writing' && (
        <article className="space-y-6">
          <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
              <Users className="w-4 h-4" /> Lesson Guide & Handouts: Writing Part 1 Essay
            </h3>
            <p className="text-xs text-rose-900 mt-2 leading-relaxed">
               essays are evaluated based on content coverage, communicative style, organization, and range of language.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready-Made Essay Prompt Handouts</h4>
              
              <div className="space-y-3">
                {[
                  {
                    id: "1",
                    theme: "Technology",
                    prompt: "Every classroom should be fully digitized with computers instead of books. Do you agree?",
                    notes: ["Cost and resources", "Student focus and distraction", "Your own idea"]
                  },
                  {
                    id: "2",
                    theme: "Environment",
                    prompt: "Governments should fine individuals who do not recycle garbage. Do you agree?",
                    notes: ["Ease of recycling", "Public education campaigns", "Your own idea"]
                  }
                ].map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm relative group">
                    <button
                      onClick={() => triggerCopy(`Theme: ${item.theme}\nEssay Prompt: ${item.prompt}\nNotes to cover: ${item.notes.join(', ')}`, `wri-${item.id}`)}
                      className="absolute top-4 right-4 p-1.5 bg-slate-50 hover:bg-slate-100 rounded text-slate-400 hover:text-indigo-600 transition-colors"
                      title="Copy to Clipboard"
                    >
                      {copiedId === `wri-${item.id}` ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clipboard className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] font-bold text-rose-600">Theme: {item.theme} (140-190 words)</span>
                    <p className="text-xs font-bold text-slate-800 mt-1">"{item.prompt}"</p>
                    <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600">
                      <span className="font-bold text-slate-700 block mb-1">Notes to write about:</span>
                      {item.notes.map((note, index) => (
                        <p key={index}>{index + 1}. {note}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 h-fit">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Classroom Activity: "The Editor Circle"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                After drafting their essays, students swap papers in groups of three. Each student acts as a specialized editor focusing on only one aspect of the rubric (e.g. connectors, grammar, spelling).
              </p>
            </section>
          </div>

          {/* Writing Rubric Reference Table */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Official B2 Writing Assessment Scale Reference</h4>
              <p className="text-[11px] text-slate-500 mt-1">Quick grading guide for teachers based on the Cambridge 4-Criterion Scale (each scored 0-5)</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3 w-1/4">Criterion</th>
                    <th className="px-5 py-3 w-1/4">Score 5 (B2 Target Achieved)</th>
                    <th className="px-5 py-3 w-1/4">Score 3 (Borderline B2)</th>
                    <th className="px-5 py-3 w-1/4">Score 1 (Below B2 / B1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-800">Content</td>
                    <td className="px-5 py-4">All content is relevant to the task. The target reader is fully informed on all bullet points.</td>
                    <td className="px-5 py-4">Minor omissions or slight irrelevance. Reader is generally informed.</td>
                    <td className="px-5 py-4">Irrelevant content or critical omissions. Target reader is not informed.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-800">Communicative Achievement</td>
                    <td className="px-5 py-4">Uses the conventions of the communicative task (e.g. essay, report) effectively to hold reader attention and express straight ideas.</td>
                    <td className="px-5 py-4">Uses conventions of the task to hold reader attention and express simple ideas. Tone may slip.</td>
                    <td className="px-5 py-4">Fails to hold reader attention. Text reads as a simple list of facts without style.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-800">Organisation</td>
                    <td className="px-5 py-4">Text is well-organised and coherent. Paragraph structures are logical, using a variety of cohesive devices (In addition, However).</td>
                    <td className="px-5 py-4">Text is generally coherent. Basic linking words (and, but, because) are overused.</td>
                    <td className="px-5 py-4">Text is poorly structured. Paragraphing is missing or illogical. Cohesive devices are absent.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="px-5 py-4 font-bold text-slate-800">Language</td>
                    <td className="px-5 py-4">Uses a range of vocabulary and simple/complex grammatical forms with control. Errors do not impede communication.</td>
                    <td className="px-5 py-4">Uses basic vocabulary and simple grammar. Control is limited when attempting complex structures.</td>
                    <td className="px-5 py-4">Very limited vocabulary. Systematic grammatical errors impede communication.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </article>
      )}

      {/* Reading & Listening Section */}
      {activeSubTab === 'reading-listening' && (
        <article className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 text-white p-5 rounded-2xl">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Teaching Strategies: Reading & Listening Comprehension
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              These sections test passive skills but require high active strategy. Elicit from students how context clues function instead of translating unknown words.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teaching Reading Part 6 (Gapped Text)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gapped text tests coherence and text layout structure. Students must place missing sentences back into a longer text.
              </p>
              <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs text-slate-700">
                <span className="font-bold text-indigo-800 block mb-1">Key Strategy: Reference Word Tracking</span>
                Teach students to highlight reference pronouns (he, it, this, these) and connectors (however, similarly, as a result) directly before and after the gap. 
              </div>
            </section>

            <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teaching Listening Part 1 & 4 (Multiple Choice)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students often fall for "distractors"—words that match the multiple choice options but do not represent the speaker's true answer or meaning.
              </p>
              <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 text-xs text-slate-700">
                <span className="font-bold text-indigo-800 block mb-1">Key Strategy: Synonyms & Paraphrasing</span>
                Remind students that the correct option will match the *meaning* of what they hear, not the exact words. Have them brainstorm synonyms for options during reading time.
              </div>
            </section>
          </div>
        </article>
      )}

    </div>
  );
}
