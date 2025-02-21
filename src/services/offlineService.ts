import * as Sentry from '@sentry/browser';

export interface Question {
  id: number;
  subject: string;
  year: number;
  difficulty: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface SimulatedResult {
  id: string;
  score: number;
  date: string;
}

const QUESTIONS_KEY = 'offline_questions';
const SIMULATED_RESULTS_KEY = 'offline_simulated_results';

export function saveQuestionsOffline(questions: Question[]): void {
  try {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
    console.log('Questões salvas para uso off-line.');
  } catch (error) {
    console.error('Erro ao salvar questões off-line:', error);
    Sentry.captureException(error);
  }
}

export function loadQuestionsOffline(): Question[] {
  try {
    const data = localStorage.getItem(QUESTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar questões off-line:', error);
    Sentry.captureException(error);
    return [];
  }
}

export function saveSimulatedResult(result: SimulatedResult): void {
  try {
    const results = loadSimulatedResults();
    results.push(result);
    localStorage.setItem(SIMULATED_RESULTS_KEY, JSON.stringify(results));
    console.log('Resultado do simulado salvo off-line.');
  } catch (error) {
    console.error('Erro ao salvar resultado do simulado off-line:', error);
    Sentry.captureException(error);
  }
}

export function loadSimulatedResults(): SimulatedResult[] {
  try {
    const data = localStorage.getItem(SIMULATED_RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao carregar resultados off-line:', error);
    Sentry.captureException(error);
    return [];
  }
}

export function syncSimulatedResults(): Promise<void> {
  return new Promise((resolve) => {
    console.log('Sincronizando resultados do simulado...');
    localStorage.removeItem(SIMULATED_RESULTS_KEY);
    resolve();
  });
}