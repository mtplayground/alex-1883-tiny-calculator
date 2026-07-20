import { KeyButton } from './KeyButton';

type NumberKeypadProps = {
  onDecimalPoint: () => void;
  onDigit: (digit: string) => void;
};

const numberKeys = ['7', '8', '9', '4', '5', '6', '1', '2', '3'];

export function NumberKeypad({ onDecimalPoint, onDigit }: NumberKeypadProps) {
  return (
    <div className="number-keypad" aria-label="Number keypad">
      {numberKeys.map((key) => (
        <KeyButton key={key} onClick={() => onDigit(key)}>
          {key}
        </KeyButton>
      ))}
      <KeyButton className="col-span-2" onClick={() => onDigit('0')}>
        0
      </KeyButton>
      <KeyButton aria-label="Decimal point" onClick={onDecimalPoint}>
        .
      </KeyButton>
    </div>
  );
}
