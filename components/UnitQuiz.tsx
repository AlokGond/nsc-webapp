'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/lib/types';

interface UnitQuizProps {
  unitNumber: number;
  questions: QuizQuestion[];
}

export default function UnitQuiz({ unitNumber, questions }: UnitQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // Lock after selection
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = questions.filter(
    q => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section id="quiz" className="my-12 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-slate-900/90 to-purple-950/20 p-6 sm:p-8 shadow-2xl">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-md bg-purple-900/60 px-2 py-0.5 text-xs font-bold text-purple-300 border border-purple-700/50">
              Interactive Assessment
            </span>
            <span className="text-xs text-slate-400">Unit {unitNumber} Mastery</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-purple-400" />
            Quick Knowledge Check (3 MCQs)
          </h3>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-purple-800/40 bg-purple-950/40 px-3.5 py-1.5 text-xs">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-slate-300 font-medium">
                Score: <strong className="text-purple-300">{correctCount}</strong> / {questions.length}
              </span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="mt-8 space-y-8">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 sm:p-6"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-900/40 text-xs font-mono font-bold text-purple-300 border border-purple-700/40">
                  {qIndex + 1}
                </span>
                <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  const isThisCorrect = q.correctIndex === optIndex;

                  let optionStyle =
                    'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      optionStyle =
                        'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (isSelected) {
                      optionStyle =
                        'border-rose-500/60 bg-rose-950/40 text-rose-200 line-through';
                    } else {
                      optionStyle = 'border-slate-800/50 bg-slate-950/30 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left text-xs sm:text-sm transition-all duration-200 ${optionStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-mono">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="flex-1 leading-snug">{option}</span>
                      {hasAnswered && isThisCorrect && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      )}
                      {hasAnswered && isSelected && !isThisCorrect && (
                        <XCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown on Answer */}
              {hasAnswered && (
                <div
                  className={`mt-4 rounded-xl border p-3.5 text-xs leading-relaxed animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                      : 'border-rose-500/30 bg-rose-950/20 text-rose-300'
                  }`}
                >
                  <div className="font-semibold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-rose-400" />
                        <span>Incorrect.</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
