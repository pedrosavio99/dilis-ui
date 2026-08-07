import { forwardRef, useEffect, useId, useRef } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import type { CheckboxProps } from './Checkbox.types';
import './Checkbox.css';

const CheckboxBase = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    label,
    description,
    checkboxSize = 'md',
    indeterminate = false,
    accentColor,
    disabled,
    className,
    id,
    style,
    ...rest
  },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const autoId = useId();
  const inputId = id ?? autoId;

  const setRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  // indeterminate so existe via DOM, nao como atributo
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-check-accent': accentColor } : null),
  } as CSSProperties;

  return (
    <label
      className={cn(
        'dui-checkbox',
        `dui-checkbox--${checkboxSize}`,
        disabled && 'dui-checkbox--disabled',
        className,
      )}
      style={styleWithAccent}
    >
      <input
        ref={setRef}
        id={inputId}
        type="checkbox"
        className="dui-checkbox__input"
        disabled={disabled}
        {...rest}
      />
      <span className="dui-checkbox__box" aria-hidden="true">
        <svg className="dui-checkbox__check" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="dui-checkbox__dash" />
      </span>

      {label || description ? (
        <span className="dui-checkbox__text">
          {label ? <span className="dui-checkbox__label">{label}</span> : null}
          {description ? <span className="dui-checkbox__desc">{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
});

export const Checkbox = CheckboxBase;
Checkbox.displayName = 'Checkbox';
