"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Title, Task, Button, Loading, RuleContainer, RuleTitle, Rule, Error }
from '../components/StyledComponents.ts';

const tasks = [
  'Trinke einen Schluck',
  'Singe ein Lied',
  'Erzähle einen Witz',
  'Tanze eine Runde',
  'Mache 10 Liegestütze'
];

export default function GamePage() {
  const router = useRouter();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [generatedRule, setGeneratedRule] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleNextTask = async () => {
    if (currentTaskIndex >= tasks.length - 1) {
      router.push('/end');
      return;
    }

    setCurrentTaskIndex(currentTaskIndex + 1);
    setGeneratedRule('');
    setError('');

    if (Math.random() < 0.5) {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/generateRule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: 'Trinkspruch',
            questions: ['Was ist dein Lieblingsgetränk?'],
            playerNames: ['Alice', 'Bob', 'Carol']
          })
        });
        const data = await response.json();
        setGeneratedRule(data.rule);
      } catch (err) {
        setError('Fehler beim Generieren der Regel.');
      }
      setIsGenerating(false);
    }
  };

  return (
    <Container>
      <Title>Aktuelle Aufgabe</Title>
      <Task>{tasks[currentTaskIndex]}</Task>
      <Button onClick={handleNextTask}>
        Nächste Aufgabe
      </Button>
      {isGenerating && <Loading>Regel wird generiert...</Loading>}
      {generatedRule && (
        <RuleContainer>
          <RuleTitle>Generierte Regel:</RuleTitle>
          <Rule>{generatedRule}</Rule>
        </RuleContainer>
      )}
      {error && <Error>{error}</Error>}
    </Container>
  );
}