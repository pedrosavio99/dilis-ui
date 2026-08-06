import { forwardRef, memo, useId } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import type { InputProps } from './Input.types';
import './Input.css';

const InputBase = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    floatingLabel = false,
    inputSize = 'md',
    accentColor,
    error,
    hint,
    leftSlot,
    className,
    id,
    placeholder,
    disabled,
    style,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = message ? `${inputId}-msg` : undefined;
  const showFloating = floatingLabel && Boolean(label);

  // accentColor injeta a variavel usada pela linha e pelo label flutuante.
  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-input-accent': accentColor } : null),
  } as CSSProperties;

  return (
    <div
      className={cn(
        'dui-input',
        `dui-input--${inputSize}`,
        showFloating && 'dui-input--floating',
        error && 'dui-input--error',
        disabled && 'dui-input--disabled',
        className,
      )}
      style={styleWithAccent}
    >
      {label && !showFloating ? (
        <label className="dui-input__top-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className="dui-input__control">
        {leftSlot ? <span className="dui-input__left">{leftSlot}</span> : null}

        <input
          ref={ref}
          id={inputId}
          className="dui-input__field"
          disabled={disabled}
          placeholder={showFloating ? ' ' : placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          {...rest}
        />

        {showFloating ? (
          <label className="dui-input__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}

        <span className="dui-input__line" aria-hidden="true" />
      </div>

      {message ? (
        <span id={messageId} className="dui-input__message">
          {message}
        </span>
      ) : null}
    </div>
  );
});

export const Input = memo(InputBase);
Input.displayName = 'Input';
