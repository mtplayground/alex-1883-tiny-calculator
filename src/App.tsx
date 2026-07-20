import './App.css';

export function App() {
  return (
    <main className="app-shell">
      <section className="app-shell__content" aria-labelledby="app-shell-title">
        <p className="app-shell__eyebrow">Ready</p>
        <h1 className="app-shell__title" id="app-shell-title">
          Empty app shell
        </h1>
        <p className="app-shell__body">
          React, TypeScript, Vite, linting, and formatting are configured for feature work.
        </p>
      </section>
    </main>
  );
}
