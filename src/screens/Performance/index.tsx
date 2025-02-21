import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { loadSimulatedResults, syncSimulatedResults, type SimulatedResult } from '../../services/offlineService';

function Performance() {
  const [results, setResults] = useState<SimulatedResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('Carregando resultados de simulado');
    try {
      const storedResults = loadSimulatedResults();
      setResults(storedResults);
    } catch (error) {
      console.error('Erro ao carregar resultados:', error);
      Sentry.captureException(error);
    }
  }, []);

  function calculateAverage(): number {
    if (results.length === 0) return 0;
    const total = results.reduce((sum, r) => sum + r.score, 0);
    return total / results.length;
  }

  async function handleSync() {
    if (navigator.onLine) {
      setLoading(true);
      try {
        await syncSimulatedResults();
        setResults([]);
        alert('Resultados sincronizados com sucesso!');
      } catch (error) {
        console.error('Erro na sincronização:', error);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Você está off-line. Conecte-se à internet para sincronizar.');
    }
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4">Relatório de Desempenho</h2>
      <p className="mb-4">Média de pontuação: {calculateAverage()}</p>
      {results.length > 0 ? (
        <ul>
          {results.map((r) => (
            <li key={r.id} className="mb-2 p-2 border rounded bg-white">
              Data: {new Date(r.date).toLocaleString()} - Pontuação: {r.score}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado armazenado.</p>
      )}
      <button onClick={handleSync} disabled={loading} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded mt-4">
        {loading ? 'Sincronizando...' : 'Sincronizar Resultados'}
      </button>
    </div>
  );
}

export default Performance;