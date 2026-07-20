import type { ReactNode } from 'react';

type CalculatorLayoutProps = {
  controls?: ReactNode;
  display: ReactNode;
  keypad: ReactNode;
};

export function CalculatorLayout({ controls, display, keypad }: CalculatorLayoutProps) {
  return (
    <main className="app-shell">
      <section className="calculator-frame" aria-label="Calculator">
        <div className="calculator-display" aria-label="Calculator display">
          {display}
        </div>
        {controls ? (
          <div className="calculator-controls" aria-label="Calculator controls">
            {controls}
          </div>
        ) : null}
        <div className="calculator-keypad" aria-label="Calculator keypad">
          {keypad}
        </div>
      </section>
    </main>
  );
}
