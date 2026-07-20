export type CalculatorOperator = '+' | '-' | 'x' | '/';

export type CalculatorState = {
  currentEntry: string;
  pendingOperator: CalculatorOperator | null;
  accumulatedValue: number | null;
  shouldReplaceEntry: boolean;
};

export const initialCalculatorState: CalculatorState = {
  currentEntry: '0',
  pendingOperator: null,
  accumulatedValue: null,
  shouldReplaceEntry: false,
};

export function enterDigit(state: CalculatorState, digit: string): CalculatorState {
  if (!/^\d$/.test(digit)) {
    return state;
  }

  if (state.shouldReplaceEntry || state.currentEntry === 'Error') {
    return {
      ...state,
      currentEntry: digit,
      shouldReplaceEntry: false,
    };
  }

  return {
    ...state,
    currentEntry: state.currentEntry === '0' ? digit : `${state.currentEntry}${digit}`,
  };
}

export function chooseOperator(
  state: CalculatorState,
  operator: CalculatorOperator,
): CalculatorState {
  if (state.currentEntry === 'Error') {
    return {
      ...initialCalculatorState,
      pendingOperator: operator,
      shouldReplaceEntry: true,
    };
  }

  if (state.pendingOperator && state.accumulatedValue !== null && !state.shouldReplaceEntry) {
    const resolvedValue = evaluate(
      state.accumulatedValue,
      Number(state.currentEntry),
      state.pendingOperator,
    );

    return {
      currentEntry: formatEntry(resolvedValue),
      pendingOperator: operator,
      accumulatedValue: Number.isFinite(resolvedValue) ? resolvedValue : null,
      shouldReplaceEntry: true,
    };
  }

  return {
    currentEntry: state.currentEntry,
    pendingOperator: operator,
    accumulatedValue: Number(state.currentEntry),
    shouldReplaceEntry: true,
  };
}

export function pressEquals(state: CalculatorState): CalculatorState {
  if (!state.pendingOperator || state.accumulatedValue === null || state.currentEntry === 'Error') {
    return {
      ...state,
      shouldReplaceEntry: true,
    };
  }

  const resolvedValue = evaluate(
    state.accumulatedValue,
    Number(state.currentEntry),
    state.pendingOperator,
  );

  return {
    currentEntry: formatEntry(resolvedValue),
    pendingOperator: null,
    accumulatedValue: null,
    shouldReplaceEntry: true,
  };
}

function evaluate(leftOperand: number, rightOperand: number, operator: CalculatorOperator): number {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case 'x':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
  }
}

function formatEntry(value: number): string {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  return Number.isInteger(value) ? String(value) : String(Number(value.toPrecision(12)));
}
