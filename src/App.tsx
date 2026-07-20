import { CalculatorLayout } from './components/CalculatorLayout';

export function App() {
  const keys = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', 'x', '0', '.', '=', '/'];

  return (
    <CalculatorLayout
      display={<span className="calculator-display__value">0</span>}
      keypad={
        <>
          {keys.map((key) => (
            <button
              className={`key-button ${['+', '-', 'x', '/', '='].includes(key) ? 'key-button--operator' : ''}`}
              key={key}
              type="button"
            >
              {key}
            </button>
          ))}
        </>
      }
    />
  );
}
