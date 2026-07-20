import type { CalculatorOperator } from '../calculator/state';
import { KeyButton } from './KeyButton';

type OperatorKeypadProps = {
  onOperator: (operator: CalculatorOperator) => void;
};

const operatorKeys: Array<{
  ariaLabel: string;
  label: string;
  operator: CalculatorOperator;
}> = [
  { ariaLabel: 'Add', label: '+', operator: '+' },
  { ariaLabel: 'Subtract', label: '−', operator: '-' },
  { ariaLabel: 'Multiply', label: '×', operator: 'x' },
  { ariaLabel: 'Divide', label: '÷', operator: '/' },
];

export function OperatorKeypad({ onOperator }: OperatorKeypadProps) {
  return (
    <div className="operator-keypad" aria-label="Operator keypad">
      {operatorKeys.map(({ ariaLabel, label, operator }) => (
        <KeyButton
          aria-label={ariaLabel}
          key={operator}
          onClick={() => onOperator(operator)}
          variant="operator"
        >
          {label}
        </KeyButton>
      ))}
    </div>
  );
}
