import React from 'react';
import type { Question } from '../../services/offlineService';

interface QuestionsUIProps {
  filteredQuestions: Question[];
  subjectFilter: string;
  setSubjectFilter: (value: string) => void;
  yearFilter: string;
  setYearFilter: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  handleDownloadOffline: () => void;
  loading: boolean;
}

function QuestionsUI({
  filteredQuestions,
  subjectFilter,
  setSubjectFilter,
  yearFilter,
  setYearFilter,
  difficultyFilter,
  setDifficultyFilter,
  handleDownloadOffline,
  loading,
}: QuestionsUIProps) {
  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Banco de Questões</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filtrar por disciplina"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="box-border p-2 border rounded cursor-pointer"
        />
        <input
          type="text"
          placeholder="Filtrar por ano"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="box-border p-2 border rounded cursor-pointer"
        />
        <input
          type="text"
          placeholder="Filtrar por dificuldade"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="box-border p-2 border rounded cursor-pointer"
        />
        <button onClick={handleDownloadOffline} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          Baixar Questões Off-line
        </button>
      </div>
      {loading ? (
        <p>Carregando questões...</p>
      ) : (
        <ul>
          {filteredQuestions.map((q) => (
            <li key={q.id} className="mb-4 p-4 border rounded bg-white">
              <p className="font-semibold">{q.text}</p>
              <ul className="list-disc pl-5">
                {q.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                Disciplina: {q.subject} | Ano: {q.year} | Dificuldade: {q.difficulty}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionsUI;