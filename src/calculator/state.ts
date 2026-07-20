import {
  errorEntry,
  evaluateOperation,
  formatValue,
  type CalculatorOperator,
  type EvaluationResult,
} from './engine';

export type { CalculatorOperator } from './engine';

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

  if (state.shouldReplaceEntry || state.currentEntry === errorEntry) {
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
  if (state.currentEntry === errorEntry) {
    return {
      ...initialCalculatorState,
      pendingOperator: operator,
      shouldReplaceEntry: true,
    };
  }

  if (state.pendingOperator && state.accumulatedValue !== null && !state.shouldReplaceEntry) {
    const result = evaluateOperation(
      state.accumulatedValue,
      Number(state.currentEntry),
      state.pendingOperator,
    );

    return nextOperationState(result, operator);
  }

  return {
    currentEntry: state.currentEntry,
    pendingOperator: operator,
    accumulatedValue: Number(state.currentEntry),
    shouldReplaceEntry: true,
  };
}

export function pressEquals(state: CalculatorState): CalculatorState {
  if (
    !state.pendingOperator ||
    state.accumulatedValue === null ||
    state.currentEntry === errorEntry
  ) {
    return {
      ...state,
      shouldReplaceEntry: true,
    };
  }

  const result = evaluateOperation(
    state.accumulatedValue,
    Number(state.currentEntry),
    state.pendingOperator,
  );

  if (!result.ok) {
    return errorState();
  }

  return {
    currentEntry: formatValue(result.value),
    pendingOperator: null,
    accumulatedValue: null,
    shouldReplaceEntry: true,
  };
}

function nextOperationState(
  result: EvaluationResult,
  pendingOperator: CalculatorOperator,
): CalculatorState {
  if (!result.ok) {
    return errorState();
  }

  return {
    currentEntry: formatValue(result.value),
    pendingOperator,
    accumulatedValue: result.value,
    shouldReplaceEntry: true,
  };
}

function errorState(): CalculatorState {
  return {
    currentEntry: errorEntry,
    pendingOperator: null,
    accumulatedValue: null,
    shouldReplaceEntry: true,
  };
}
