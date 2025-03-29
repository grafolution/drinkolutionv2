"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Task,
  AcceptButton,
  DeclineButton,
  Loading,
  RuleContainer,
  RuleTitle,
  Rule,
  Error,
  ButtonGroup
} from '../components/StyledComponents';



export default function GamePage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [generatedRule, setGeneratedRule] = useState('');
  const [isGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      console.log("data", data);
      setTasks(data);
    }
    loadTasks();
  }, []);
  // Move to next task and optionally generate a new rule
  const handleNextTask = async () => {
    if (currentTaskIndex >= tasks.length - 1) {
      router.push('/end');
      return;
    }
    setCurrentTaskIndex(currentTaskIndex + 1);
    setGeneratedRule('');
    setError('');

    // With 50% probability, generate a new rule based on the next task's context
    if (Math.random() < 0.5 && tasks[currentTaskIndex + 1]) {
//
//       try {
//         const taskContext = tasks[currentTaskIndex + 1];
//         const response = await fetch('/api/generateRule', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             category: taskContext.category || 'question',
//             questions: [taskContext.description || 'What is your favorite drink?'],
//             playerNames: ['Alice', 'Bob', 'Carol']
//           })
//         });
//         const data = await response.json();
//         if (data.rule) {
//           setGeneratedRule(data.rule);
//         }
//       } catch (err: any) {
//         console.error("Error generating rule:", err);
//         setError("Error generating rule.");
//       }
//       setIsGenerating(false);
    }
  };

  // Handle task acceptance (record or proceed as needed)
  const handleAcceptTask = () => {
    console.log("Task accepted:", tasks[currentTaskIndex]);
    // Here you could send an update to your backend if needed.
    handleNextTask();
  };

  // Handle task decline (skip to next task)
  const handleDeclineTask = () => {
    console.log("Task declined:", tasks[currentTaskIndex]);
    // Optionally record the decline in your database.
    handleNextTask();
  };

  return (
    <Container>
      <Title>Current Task</Title>
      {tasks.length > 0 ? (
        <Task>
          <p><strong>Description:</strong> {tasks[currentTaskIndex]?.description}</p>
          <p><strong>Category:</strong> {tasks[currentTaskIndex]?.category}</p>
          <p><strong>Difficulty:</strong> {tasks[currentTaskIndex]?.difficulty}</p>
          <p><strong>Points:</strong> {tasks[currentTaskIndex]?.points}</p>
        </Task>
      ) : (
        <Task>Loading tasks...</Task>
      )}

    <ButtonGroup>
      <AcceptButton onClick={handleAcceptTask}>Accept Task</AcceptButton>
      <DeclineButton onClick={handleDeclineTask}>Decline Task</DeclineButton>
    </ButtonGroup>

      {isGenerating && <Loading>Generating rule...</Loading>}
      {generatedRule && (
        <RuleContainer>
          <RuleTitle>Generated Rule:</RuleTitle>
          <Rule>{generatedRule}</Rule>
        </RuleContainer>
      )}
      {error && <Error>{error}</Error>}
    </Container>
  );
}
