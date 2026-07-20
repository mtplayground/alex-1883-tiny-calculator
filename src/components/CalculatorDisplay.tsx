import { formatOperator, formatValue } from '../calculator/engine';
import type { CalculatorState } from '../calculator/state';

type CalculatorDisplayProps = {
  state: CalculatorState;
};

export function CalculatorDisplay({ state }: CalculatorDisplayProps) {
  const pendingExpression =
    state.pendingOperator && state.accumulatedValue !== null
      ? `${formatValue(state.accumulatedValue)} ${formatOperator(state.pendingOperator)}`
      : '';

  return (
    <>
      <span className="calculator-display__meta" title={pendingExpression}>
        {pendingExpression}
      </span>
      <span className="calculator-display__value" dir="ltr" title={state.currentEntry}>
        {state.currentEntry}
      </span>
    </>
  );
}
