export type CalculatorOperator = '+' | '-' | 'x' | '/';

export type EvaluationError = 'divide-by-zero' | 'invalid-result';

export type EvaluationResult =
  | {
      ok: true;
      value: number;
    }
  | {
      ok: false;
      error: EvaluationError;
    };

export const errorEntry = 'Error';

export function evaluateOperation(
  leftOperand: number,
  rightOperand: number,
  operator: CalculatorOperator,
): EvaluationResult {
  if (operator === '/' && rightOperand === 0) {
    return {
      ok: false,
      error: 'divide-by-zero',
    };
  }

  const value = calculate(leftOperand, rightOperand, operator);

  if (!Number.isFinite(value)) {
    return {
      ok: false,
      error: 'invalid-result',
    };
  }

  return {
    ok: true,
    value,
  };
}

export function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toPrecision(12)));
}

function calculate(
  leftOperand: number,
  rightOperand: number,
  operator: CalculatorOperator,
): number {
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
