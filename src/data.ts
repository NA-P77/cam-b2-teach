import { ExamPaper, LessonPhase, TeachingTip, WeekPlan } from './types';

export const EXAM_PAPERS: ExamPaper[] = [
  {
    name: 'Reading & Use of English',
    duration: '1 hour 15 mins',
    parts: 7,
    description: 'Tests reading comprehension and control of grammar and vocabulary.',
    breakdown: [
      { part: 'Part 1: Multiple-choice cloze', format: '8 questions. Choose the correct word to fill gaps.', focus: 'Vocabulary (idioms, collocations, phrasal verbs).' },
      { part: 'Part 2: Open cloze', format: '8 questions. Fill the gaps with one word.', focus: 'Grammar and vocabulary.' },
      { part: 'Part 3: Word formation', format: '8 questions. Change the form of a given word to fill a gap.', focus: 'Vocabulary (prefixes, suffixes, compounding).' },
      { part: 'Part 4: Key word transformations', format: '6 questions. Rewrite a sentence using a given word so it means the same.', focus: 'Grammar and vocabulary.' },
      { part: 'Part 5: Multiple choice', format: '6 questions based on a text.', focus: 'Detail, opinion, tone, purpose, main idea.' },
      { part: 'Part 6: Gapped text', format: '6 questions. Insert missing sentences into a text.', focus: 'Text structure, cohesion, coherence.' },
      { part: 'Part 7: Multiple matching', format: '10 questions. Match prompts to elements in a text or texts.', focus: 'Specific information, detail.' }
    ]
  },
  {
    name: 'Writing',
    duration: '1 hour 20 mins',
    parts: 2,
    description: 'Requires producing two different pieces of writing, such as essays, letters/emails, reports, or reviews.',
    breakdown: [
      { part: 'Part 1: Compulsory Essay', format: 'Write an essay based on a prompt and two given bullet points (140-190 words).', focus: 'Expressing opinions, giving reasons, organizing ideas.' },
      { part: 'Part 2: Choice of task', format: 'Choose one from an article, email/letter, report, or review (140-190 words).', focus: 'Writing for a specific target reader, using appropriate tone and format.' }
    ]
  },
  {
    name: 'Listening',
    duration: 'Approx. 40 mins',
    parts: 4,
    description: 'Tests ability to understand spoken English in various contexts.',
    breakdown: [
      { part: 'Part 1: Multiple choice', format: '8 short extracts with one question each.', focus: 'Feeling, attitude, opinion, purpose.' },
      { part: 'Part 2: Sentence completion', format: 'Complete 10 sentences based on a monologue.', focus: 'Specific information, stated opinion.' },
      { part: 'Part 3: Multiple matching', format: 'Match 5 short extracts to 8 options.', focus: 'General gist, attitude, opinion, purpose.' },
      { part: 'Part 4: Multiple choice', format: '7 questions based on an interview or exchange.', focus: 'Attitude, opinion, gist, detail.' }
    ]
  },
  {
    name: 'Speaking',
    duration: '14 mins',
    parts: 4,
    description: 'Face-to-face test taken with one or two other candidates.',
    breakdown: [
      { part: 'Part 1: Interview (2 mins)', format: 'Conversation with the examiner.', focus: 'General interaction, personal information.' },
      { part: 'Part 2: Long turn (4 mins)', format: 'Compare two photographs and answer a question for 1 min.', focus: 'Organizing discourse, comparing, describing, expressing opinions.' },
      { part: 'Part 3: Collaborative task (4 mins)', format: 'Discuss a prompt with the other candidate and reach a decision.', focus: 'Exchanging ideas, negotiating, justifying opinions.' },
      { part: 'Part 4: Discussion (4 mins)', format: 'Further discussion related to the topic in Part 3.', focus: 'Expressing and justifying opinions, agreeing/disagreeing.' }
    ]
  }
];

export const LESSON_STRUCTURE: LessonPhase[] = [
  {
    name: 'Warm-up / Lead-in',
    duration: '5-10 mins',
    description: 'Engage students, activate background knowledge, and introduce the topic of the lesson.',
    teacherRole: 'Facilitator. Ask open-ended questions, show a picture, or play a quick game.',
    studentRole: 'Active participant. Speak freely without worrying too much about accuracy.'
  },
  {
    name: 'Presentation / Teach',
    duration: '15-20 mins',
    description: 'Introduce the target language (grammar, vocabulary, or exam strategy).',
    teacherRole: 'Instructor. Provide clear context, elicit from students, teach rules, highlight form and pronunciation.',
    studentRole: 'Observer and active listener. Ask clarification questions. Take notes.'
  },
  {
    name: 'Controlled Practice',
    duration: '15-20 mins',
    description: 'Students practice the target language in restricted exercises (fill-in-the-blanks, matching).',
    teacherRole: 'Monitor. Circulate the room, check understanding, provide immediate correction if necessary.',
    studentRole: 'Focused worker. Apply the rules learned in the presentation phase. Usually done individually or in pairs.'
  },
  {
    name: 'Freer Practice / Production',
    duration: '25-30 mins',
    description: 'Students use the target language in a more open, communicative context (roleplays, discussions, writing tasks).',
    teacherRole: 'Observer. Step back, take notes on errors for later, only intervene if communication completely breaks down.',
    studentRole: 'Communicator. Focus on fluency rather than perfect accuracy. Work in pairs or small groups.'
  },
  {
    name: 'Wrap-up & Error Correction',
    duration: '10 mins',
    description: 'Review the lesson, provide feedback, and correct common errors observed during freer practice.',
    teacherRole: 'Guide. Write anonymous errors on the board and have the class correct them together.',
    studentRole: 'Reflective learner. Correct mistakes, ask final questions.'
  }
];

export const CURRICULUM_PLAN: WeekPlan[] = [
  {
    week: 1,
    theme: 'Introductions & Daily Life',
    grammar: ['Present Simple vs Continuous', 'State Verbs'],
    examFocus: ['Speaking Part 1 (Interview)', 'Writing Part 2 (Informal Email)'],
    objectives: ['Establish baseline speaking skills', 'Understand email formatting conventions']
  },
  {
    week: 2,
    theme: 'Travel & Experiences',
    grammar: ['Past Simple vs Past Continuous', 'Present Perfect Simple'],
    examFocus: ['Reading & UoE Part 1 (Multiple-choice cloze)', 'Listening Part 1'],
    objectives: ['Master common travel collocations', 'Identify distractors in short listenings']
  },
  {
    week: 3,
    theme: 'Work & Education',
    grammar: ['Present Perfect Continuous', 'Used to / Would'],
    examFocus: ['Reading & UoE Part 2 (Open cloze)', 'Writing Part 1 (Essay basics)'],
    objectives: ['Understand essay structure (intro, 2 points, conclusion)', 'Identify missing prepositions/articles']
  },
  {
    week: 4,
    theme: 'Health & Lifestyle',
    grammar: ['Future Forms (Will, Going to, Present Continuous)', 'Future Perfect/Continuous'],
    examFocus: ['Speaking Part 2 (Comparing photos)', 'Reading & UoE Part 3 (Word formation)'],
    objectives: ['Learn vocabulary for speculation (might be, looks like)', 'Master common prefixes/suffixes']
  },
  {
    week: 5,
    theme: 'Environment & Nature',
    grammar: ['Conditionals (Zero, First, Second)'],
    examFocus: ['Reading & UoE Part 4 (Key word transformations)', 'Listening Part 2 (Sentence completion)'],
    objectives: ['Practice grammar transformations safely', 'Predict missing words in listening tasks']
  },
  {
    week: 6,
    theme: 'Technology & Media',
    grammar: ['Conditionals (Third, Mixed)', 'Wish / If Only'],
    examFocus: ['Writing Part 2 (Article)', 'Reading & UoE Part 5 (Multiple choice reading)'],
    objectives: ['Write engaging titles and use rhetorical questions', 'Skim and scan for specific detail']
  },
  {
    week: 7,
    theme: 'Entertainment & Arts',
    grammar: ['Passive Voice (all tenses)', 'Causative (have/get something done)'],
    examFocus: ['Writing Part 2 (Review)', 'Speaking Part 3 (Collaborative task)'],
    objectives: ['Use descriptive adjectives for reviews', 'Learn phrases for agreeing/disagreeing politely']
  },
  {
    week: 8,
    theme: 'Society & Relationships',
    grammar: ['Reported Speech', 'Reporting Verbs'],
    examFocus: ['Listening Part 3 (Multiple matching)', 'Speaking Part 4 (Discussion)'],
    objectives: ['Identify speaker attitudes and feelings', 'Develop and justify opinions at length']
  },
  {
    week: 9,
    theme: 'Crime & Punishment',
    grammar: ['Modals of Deduction (must have, can\'t have)', 'Relative Clauses'],
    examFocus: ['Reading & UoE Part 6 (Gapped text)', 'Writing Part 2 (Report)'],
    objectives: ['Identify cohesive devices and reference words (this, however)', 'Use formal formatting (headings, bullet points)']
  },
  {
    week: 10,
    theme: 'Money & Shopping',
    grammar: ['Gerunds & Infinitives', 'Expressing Preference (would rather, prefer)'],
    examFocus: ['Reading & UoE Part 7 (Multiple matching)', 'Listening Part 4 (Multiple choice)'],
    objectives: ['Scan multiple texts for specific opinions', 'Manage focus during long interviews']
  },
  {
    week: 11,
    theme: 'Mock Exam Week',
    grammar: ['Review of weak areas based on teacher assessment'],
    examFocus: ['Full timed practice of all papers'],
    objectives: ['Experience full exam conditions', 'Manage time effectively under pressure']
  },
  {
    week: 12,
    theme: 'Fine-Tuning & Exam Strategy',
    grammar: ['Advanced collocations', 'Phrasal verbs review'],
    examFocus: ['Targeted practice on lowest scoring sections', 'Speaking mock tests'],
    objectives: ['Build confidence', 'Finalize personal exam strategies', 'Minimize unforced errors']
  }
];

export const TEACHING_TIPS: TeachingTip[] = [
  {
    title: 'Never skip the Warm-up',
    description: 'It is tempting to jump straight into the grammar book, but a 5-minute warm-up sets the tone for the entire class.',
    actionable: [
      'Show a controversial or interesting picture related to the topic.',
      'Ask 2-3 broad questions for them to discuss in pairs.',
      'Do a quick vocabulary review game from the previous lesson.'
    ]
  },
  {
    title: 'Reduce Teacher Talking Time (TTT)',
    description: 'In a B2 class, the students should be doing 70% of the talking. The teacher should facilitate, not lecture.',
    actionable: [
      'Instead of explaining a grammar rule, write examples on the board and ask students to deduce the rule.',
      'Put students in pairs to compare answers before checking them as a class.',
      'Use open questions: "Why is this wrong?" instead of "This is wrong because..."'
    ]
  },
  {
    title: 'Delay Error Correction',
    description: 'Interrupting a student mid-sentence to correct their grammar destroys their fluency and confidence.',
    actionable: [
      'During speaking activities, walk around with a notebook and write down common errors.',
      'At the end of the lesson, write 3-5 incorrect sentences on the board (anonymously).',
      'Have the class work together to find and fix the mistakes.'
    ]
  },
  {
    title: 'Teach Exam Strategies, Not Just English',
    description: 'Cambridge exams are highly structured. A student with good English can fail if they don\'t know the test format.',
    actionable: [
      'For Speaking Part 2, remind them: DO NOT just describe the photos, they must answer the printed question.',
      'For Reading Part 6 (Gapped text), teach them to look for pronouns (he, it, this) and linking words (however, therefore) before and after the gap.',
      'For Listening, tell them to underline keywords in the questions during the 45 seconds of reading time.'
    ]
  }
];
