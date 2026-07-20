import { useState } from 'react';
import {
  chooseOperator,
  enterDecimalPoint,
  enterDigit,
  initialCalculatorState,
} from './calculator/state';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorLayout } from './components/CalculatorLayout';
import { NumberKeypad } from './components/NumberKeypad';
import { OperatorKeypad } from './components/OperatorKeypad';

export function App() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);

  return (
    <CalculatorLayout
      display={<CalculatorDisplay state={calculatorState} />}
      keypad={
        <div className="calculator-keypad-grid">
          <NumberKeypad
            onDecimalPoint={() => setCalculatorState((state) => enterDecimalPoint(state))}
            onDigit={(digit) => setCalculatorState((state) => enterDigit(state, digit))}
          />
          <OperatorKeypad
            onOperator={(operator) =>
              setCalculatorState((state) => chooseOperator(state, operator))
            }
          />
        </div>
      }
    />
  );
}
