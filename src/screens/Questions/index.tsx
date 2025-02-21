import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { saveQuestionsOffline, loadQuestionsOffline, type Question } from '../../services/offlineService';
import { dummyQuestions } from './dummyData';
import QuestionsUI from './QuestionsUI';

function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [yearFilter, setYearFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        if (navigator.onLine) {
          console.log('Fetching questions online...');
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setQuestions(dummyQuestions);
        } else {
          console.log('Offline: Loading questions from local storage');
          const offlineQuestions = loadQuestionsOffline();
          setQuestions(offlineQuestions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  function handleDownloadOffline() {
    try {
      saveQuestionsOffline(dummyQuestions);
      console.log('Questions saved for offline use');
      alert('Questões baixadas para uso off-line.');
    } catch (error) {
      console.error('Error saving questions offline:', error);
      Sentry.captureException(error);
    }
  }

  const filteredQuestions = questions.filter((q) => {
    return (
      (subjectFilter ? q.subject.toLowerCase().includes(subjectFilter.toLowerCase()) : true) &&
      (yearFilter ? q.year.toString() === yearFilter : true) &&
      (difficultyFilter ? q.difficulty.toLowerCase() === difficultyFilter.toLowerCase() : true)
    );
  });

  return (
    <QuestionsUI
      filteredQuestions={filteredQuestions}
      subjectFilter={subjectFilter}
      setSubjectFilter={setSubjectFilter}
      yearFilter={yearFilter}
      setYearFilter={setYearFilter}
      difficultyFilter={difficultyFilter}
      setDifficultyFilter={setDifficultyFilter}
      handleDownloadOffline={handleDownloadOffline}
      loading={loading}
    />
  );
}

export default Questions;