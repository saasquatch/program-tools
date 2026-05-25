import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TaskCardView } from './TaskCardView';
import { useTaskCard } from './useTaskCard';

export interface TaskCardProps {
  rewardAmount?: string;
  rewardUnit: string;
  taskCardTitle?: string;
  taskCardDescription?: string;
  buttonText: string;
  buttonLink?: string;
  showProgressBar: boolean;
  progressCurrent: number;
  progressGoal: number;
  completedText: string;
  repeatable: boolean;
  dateExpires?: string;
  cardIcon?: string;
  cardStatus: 'incomplete' | 'complete' | 'expired';
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

function parseStatus(value: unknown): TaskCardProps['cardStatus'] {
  return value === 'complete' || value === 'expired' ? value : 'incomplete';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-task-card': HTMLElement;
  }
}

export const TaskCard = useComponent<TaskCardProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TaskCardProps, unknown>>;
    const props: TaskCardProps = {
      rewardAmount: typeof rawProps.rewardAmount === 'string' ? rawProps.rewardAmount : undefined,
      rewardUnit: typeof rawProps.rewardUnit === 'string' ? rawProps.rewardUnit : 'Points',
      taskCardTitle: typeof rawProps.taskCardTitle === 'string' ? rawProps.taskCardTitle : undefined,
      taskCardDescription:
        typeof rawProps.taskCardDescription === 'string' ? rawProps.taskCardDescription : undefined,
      buttonText: typeof rawProps.buttonText === 'string' ? rawProps.buttonText : 'Start',
      buttonLink: typeof rawProps.buttonLink === 'string' ? rawProps.buttonLink : undefined,
      showProgressBar: parseBoolean(rawProps.showProgressBar, false),
      progressCurrent: parseNumber(rawProps.progressCurrent, 0),
      progressGoal: parseNumber(rawProps.progressGoal, 1),
      completedText: typeof rawProps.completedText === 'string' ? rawProps.completedText : 'Completed!',
      repeatable: parseBoolean(rawProps.repeatable, false),
      dateExpires: typeof rawProps.dateExpires === 'string' ? rawProps.dateExpires : undefined,
      cardIcon: typeof rawProps.cardIcon === 'string' ? rawProps.cardIcon : undefined,
      cardStatus: parseStatus(rawProps.cardStatus),
    };

    const hookProps = useTaskCard(props);

    return TaskCardView({ ...props, ...hookProps });
  },
  'sql-task-card',
  [
    'reward-amount',
    'reward-unit',
    'task-card-title',
    'task-card-description',
    'button-text',
    'button-link',
    'show-progress-bar',
    'progress-current',
    'progress-goal',
    'completed-text',
    'repeatable',
    'date-expires',
    'card-icon',
    'card-status',
  ] as const
);
