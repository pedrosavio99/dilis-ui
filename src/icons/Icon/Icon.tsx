import { forwardRef, memo } from 'react';
import { cn } from '../../utils/cn';
import type { IconProps } from './Icon.types';

const IconBase = forwardRef<SVGSVGElement, IconProps>(function Icon(
  {
    size = 24,
    viewBox = '0 0 24 24',
    color,
    label,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('dui-icon', className)}
      style={color ? { color } : undefined}
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      {...rest}
    >
      {label ? <title>{label}</title> : null}
      {children}
    </svg>
  );
});

/**
 * Wrapper generico de icone. Padroniza tamanho, cor (currentColor) e
 * acessibilidade. Passe os paths como children usando currentColor.
 *
 * @example
 * <Icon label="buscar">
 *   <path d="M5 12h14" stroke="currentColor" strokeWidth="2" />
 * </Icon>
 */
export const Icon = memo(IconBase);
Icon.displayName = 'Icon';