export function App() {
  const keys = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', 'x', '0', '.', '=', '/'];

  return (
    <main className="app-shell">
      <section className="calculator-surface" aria-label="Calculator shell">
        <div className="calculator-display" aria-label="Calculator display">
          0
        </div>
        <div className="key-grid" aria-label="Calculator controls">
          {keys.map((key) => (
            <button
              className={`key-button ${['+', '-', 'x', '/', '='].includes(key) ? 'key-button--operator' : ''}`}
              key={key}
              type="button"
            >
              {key}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
