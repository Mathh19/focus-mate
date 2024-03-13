import { FeedbackCyclesProps } from './types';

export const FeedbackCycles = ({
  cycles,
  completedCycles,
}: FeedbackCyclesProps) => {
  const cyclesElement = [];
  const completedCyclesElement = Array(cycles).fill(undefined);

  for (let i = 0; i < cycles; i++) {
    cyclesElement.push(
      <span
        key={i}
        className="h-3 w-3 rounded-full bg-skin-input-primary"
      ></span>,
    );
  }

  for (let i = 0; i < cycles; i++) {
    if (i < completedCycles) {
      completedCyclesElement[i] = (
        <span
          key={i}
          aria-label={`Cycle ${i + 1} of ${cycles}`}
          className="inline-block h-3 w-3 rounded-full bg-skin-cycles-fill"
        ></span>
      );
    }
  }

  return (
    <div className="relative flex max-w-2xl flex-wrap gap-4">
      {cyclesElement}
      <div
        aria-label={`Completed cycles: ${completedCycles}`}
        className="absolute flex gap-4"
      >
        <span className="sr-only">Completed cycles:</span>
        {completedCyclesElement}
      </div>
    </div>
  );
};
