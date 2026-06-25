export type TabId = 'curriculum' | 'lesson-plan' | 'exam-breakdown' | 'tips' | 'lesson-planner' | 'resource-bank' | 'class-tracker' | 'mock-timer';

export interface WeekPlan {
  week: number;
  theme: string;
  grammar: string[];
  examFocus: string[];
  objectives: string[];
}

export interface LessonPhase {
  name: string;
  duration: string;
  description: string;
  teacherRole: string;
  studentRole: string;
}

export interface ExamPaper {
  name: string;
  duration: string;
  parts: number;
  description: string;
  breakdown: { part: string; format: string; focus: string }[];
}

export interface TeachingTip {
  title: string;
  description: string;
  actionable: string[];
}
