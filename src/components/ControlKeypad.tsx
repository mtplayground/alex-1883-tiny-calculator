import { KeyButton } from './KeyButton';

type ControlKeypadProps = {
  onBackspace: () => void;
  onClear: () => void;
  onEquals: () => void;
};

export function ControlKeypad({ onBackspace, onClear, onEquals }: ControlKeypadProps) {
  return (
    <div className="control-keypad" aria-label="Control keypad">
      <KeyButton aria-label="Clear" onClick={onClear} variant="control">
        C
      </KeyButton>
      <KeyButton aria-label="Backspace" onClick={onBackspace} variant="control">
        ⌫
      </KeyButton>
      <KeyButton aria-label="Equals" onClick={onEquals} variant="operator">
        =
      </KeyButton>
    </div>
  );
}
