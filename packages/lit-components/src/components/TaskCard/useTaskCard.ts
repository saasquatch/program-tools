import { useState } from '@saasquatch/universal-hooks';
import type { TaskCardProps } from './TaskCard';

export interface TaskCardHookResult {
  progress: number;
  isComplete: boolean;
  isExpired: boolean;
  onClick: () => void;
}

export function useTaskCard(props: TaskCardProps): TaskCardHookResult {
  const [, setLastClickedAt] = useState<number | null>(null);
  const current = Number(props.progressCurrent) || 0;
  const goal = Math.max(Number(props.progressGoal) || 1, 1);
  const progress = Math.min((current / goal) * 100, 100);
  const isComplete = props.cardStatus === 'complete' || current >= goal;
  const isExpired = props.cardStatus === 'expired';

  function onClick() {
    setLastClickedAt(Date.now());

    if (props.buttonLink) {
      window.open(props.buttonLink, '_blank');
    }

    const event = new CustomEvent('sq:task-click', {
      bubbles: true,
      composed: true,
      detail: { taskTitle: props.taskCardTitle },
    });

    document.dispatchEvent(event);
  }

  return { progress, isComplete, isExpired, onClick };
}
