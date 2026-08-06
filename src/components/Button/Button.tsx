import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';
import './Button.css';

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'dui-btn',
        `dui-btn--${variant}`,
        `dui-btn--${size}`,
        fullWidth && 'dui-btn--full',
        loading && 'dui-btn--loading',
        className,
      )}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="dui-btn__spinner" aria-hidden="true" />
      ) : (
        leftIcon && (
          <span className="dui-btn__icon" aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}
      {children}
      {!loading && rightIcon && (
        <span className="dui-btn__icon" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
});

/**
 * Botao base da Dilis UI.
 * Aceita todas as props nativas de <button> mais variant, size, loading, etc.
 */
export const Button = memo(ButtonBase);
Button.displayName = 'Button';
