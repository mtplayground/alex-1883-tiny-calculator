import type { ReactNode } from 'react';

type CalculatorLayoutProps = {
  display: ReactNode;
  keypad: ReactNode;
};

export function CalculatorLayout({ display, keypad }: CalculatorLayoutProps) {
  return (
    <main className="app-shell">
      <section className="calculator-frame" aria-label="Calculator">
        <div className="calculator-display" aria-label="Calculator display">
          {display}
        </div>
        <div className="calculator-keypad" aria-label="Calculator keypad">
          {keypad}
        </div>
      </section>
    </main>
  );
}
