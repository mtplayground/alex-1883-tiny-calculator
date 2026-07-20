import { useState } from 'react';
import {
  backspaceEntry,
  chooseOperator,
  clearCalculator,
  enterDecimalPoint,
  enterDigit,
  initialCalculatorState,
  pressEquals,
} from './calculator/state';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorLayout } from './components/CalculatorLayout';
import { ControlKeypad } from './components/ControlKeypad';
import { NumberKeypad } from './components/NumberKeypad';
import { OperatorKeypad } from './components/OperatorKeypad';

export function App() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);

  return (
    <CalculatorLayout
      controls={
        <ControlKeypad
          onBackspace={() => setCalculatorState((state) => backspaceEntry(state))}
          onClear={() => setCalculatorState(clearCalculator())}
          onEquals={() => setCalculatorState((state) => pressEquals(state))}
        />
      }
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
