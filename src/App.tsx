import { useState } from 'react';
import { enterDecimalPoint, enterDigit, initialCalculatorState } from './calculator/state';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { CalculatorLayout } from './components/CalculatorLayout';
import { NumberKeypad } from './components/NumberKeypad';

export function App() {
  const [calculatorState, setCalculatorState] = useState(initialCalculatorState);

  return (
    <CalculatorLayout
      display={<CalculatorDisplay state={calculatorState} />}
      keypad={
        <NumberKeypad
          onDecimalPoint={() => setCalculatorState((state) => enterDecimalPoint(state))}
          onDigit={(digit) => setCalculatorState((state) => enterDigit(state, digit))}
        />
      }
    />
  );
}
