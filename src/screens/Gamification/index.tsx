import { useState } from 'react';
import * as Sentry from '@sentry/browser';

function Gamification() {
  const [points, setPoints] = useState<number>(1000);
  const [level, setLevel] = useState<string>('Pro');

  function handleUpdate() {
    try {
      console.log('Atualizando dados de gamificação');
      // Simulação de atualização dos dados
      setPoints(points + 50);
      alert('Dados de gamificação atualizados!');
    } catch (error) {
      console.error('Erro ao atualizar dados de gamificação:', error);
      Sentry.captureException(error);
    }
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Gamificação</h2>
      <p className="mb-2">Pontos: {points}</p>
      <p className="mb-4">Nível: {level}</p>
      <button onClick={handleUpdate} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
        Atualizar Pontos
      </button>
    </div>
  );
}

export default Gamification;