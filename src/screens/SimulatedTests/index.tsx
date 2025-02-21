import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import { saveSimulatedResult, syncSimulatedResults, type SimulatedResult } from '../../services/offlineService';
import OptionList from './OptionList';
import useTimer from './useTimer';

function SimulatedTests() {
  const [question] = useState({
    id: 101,
    text: 'Qual é a capital do Brasil?',
    options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
    correctOptionIndex: 2,
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const timer = useTimer(60, submitted);

  function handleOptionChange(index: number) {
    setSelectedOption(index);
  }

  async function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    setLoading(true);
    try {
      const score = selectedOption === question.correctOptionIndex ? 100 : 0;
      const result: SimulatedResult = {
        id: new Date().toISOString(),
        score,
        date: new Date().toISOString(),
      };
      saveSimulatedResult(result);
      console.log('Simulado concluído, resultado salvo:', result);
      alert(`Simulado finalizado! Sua pontuação: ${score}`);
    } catch (error) {
      console.error('Erro ao salvar resultado do simulado:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    if (navigator.onLine) {
      setLoading(true);
      try {
        await syncSimulatedResults();
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
      <h2 className="text-2xl font-bold mb-4">Simulado Personalizado</h2>
      <div className="mb-4 p-4 border rounded bg-white">
        <p className="mb-2">{question.text}</p>
        <OptionList options={question.options} handleOptionChange={handleOptionChange} submitted={submitted} />
      </div>
      <div className="mb-4">
        <p>Tempo restante: {timer} segundos</p>
      </div>
      <div className="flex gap-4">
        <button onClick={handleSubmit} disabled={submitted || loading} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Enviando...' : 'Enviar Respostas'}
        </button>
        <button onClick={handleSync} disabled={loading} className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
          Sincronizar Resultados
        </button>
      </div>
    </div>
  );
}

export default SimulatedTests;