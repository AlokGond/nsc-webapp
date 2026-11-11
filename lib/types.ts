export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface Diagram {
  title: string;
  type: 'ascii' | 'box' | 'flowchart';
  content: string; // ASCII or structured layout text
  caption?: string;
}

export interface SubTopic {
  slug: string;
  title: string;
  shortDesc: string;
  unitId: string;
  unitNumber: number;
  explanation: string[];
  realWorldExample: {
    title: string;
    description: string;
    impact: string;
  };
  keyPoints: string[];
  diagram?: Diagram;
  codeSnippet?: CodeSnippet;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Unit {
  id: string; // e.g., 'unit-1'
  number: number;
  title: string;
  hours: number;
  courseOutcome: string;
  description: string;
  badge: string;
  subtopics: SubTopic[];
  quiz: QuizQuestion[];
}
