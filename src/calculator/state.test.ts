import { describe, expect, it } from 'vitest';
import {
  backspaceEntry,
  chooseOperator,
  clearCalculator,
  enterDecimalPoint,
  enterDigit,
  initialCalculatorState,
  pressEquals,
  type CalculatorState,
} from './state';

function enterNumber(state: CalculatorState, value: string): CalculatorState {
  return [...value].reduce((nextState, character) => {
    if (character === '.') {
      return enterDecimalPoint(nextState);
    }

    return enterDigit(nextState, character);
  }, state);
}

describe('calculator state engine', () => {
  it.each([
    ['+', '5'],
    ['-', '1'],
    ['x', '6'],
    ['/', '1.5'],
  ] as const)('evaluates %s operations', (operator, expectedEntry) => {
    const state = pressEquals(
      enterNumber(chooseOperator(enterNumber(initialCalculatorState, '3'), operator), '2'),
    );

    expect(state.currentEntry).toBe(expectedEntry);
    expect(state.pendingOperator).toBeNull();
    expect(state.accumulatedValue).toBeNull();
  });

  it('evaluates chained operations as each operator is chosen', () => {
    const state = pressEquals(
      enterNumber(
        chooseOperator(
          enterNumber(chooseOperator(enterNumber(initialCalculatorState, '2'), '+'), '3'),
          'x',
        ),
        '4',
      ),
    );

    expect(state.currentEntry).toBe('20');
  });

  it('surfaces divide-by-zero as a displayable error state', () => {
    const state = pressEquals(
      enterNumber(chooseOperator(enterNumber(initialCalculatorState, '8'), '/'), '0'),
    );

    expect(state.currentEntry).toBe('Error');
    expect(state.pendingOperator).toBeNull();
    expect(state.accumulatedValue).toBeNull();
  });

  it('allows only one decimal point in the current entry', () => {
    const state = enterDecimalPoint(enterNumber(initialCalculatorState, '12.3'));

    expect(state.currentEntry).toBe('12.3');
  });

  it('clears back to the initial zero state', () => {
    const state = clearCalculator();

    expect(state).toEqual(initialCalculatorState);
  });

  it('backspaces the current entry without dropping below zero', () => {
    const edited = backspaceEntry(enterNumber(initialCalculatorState, '123'));
    const emptied = backspaceEntry(backspaceEntry(backspaceEntry(edited)));

    expect(edited.currentEntry).toBe('12');
    expect(emptied.currentEntry).toBe('0');
  });
});
