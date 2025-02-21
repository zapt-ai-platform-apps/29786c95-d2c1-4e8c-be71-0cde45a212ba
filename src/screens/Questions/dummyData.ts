import type { Question } from '../../services/offlineService';

export const dummyQuestions: Question[] = [
  {
    id: 1,
    subject: 'Legislação',
    year: 2018,
    difficulty: 'Fácil',
    text: 'Qual é a lei que regula a segurança no trabalho?',
    options: ['NR 10', 'NR 12', 'NR 15', 'NR 17'],
    correctOptionIndex: 0,
  },
  {
    id: 2,
    subject: 'Segurança do Trabalho',
    year: 2019,
    difficulty: 'Médio',
    text: 'Qual equipamento é obrigatório em ambientes com risco de queda?',
    options: ['Capacete', 'Cinto de segurança', 'Luvas', 'Óculos de proteção'],
    correctOptionIndex: 1,
  },
  {
    id: 3,
    subject: 'Raciocínio Lógico',
    year: 2020,
    difficulty: 'Difícil',
    text: 'Resolva: Se A = {1, 2} e B = {2, 3}, qual é A ∩ B?',
    options: ['{1}', '{2}', '{1,2}', '{2,3}'],
    correctOptionIndex: 1,
  },
];