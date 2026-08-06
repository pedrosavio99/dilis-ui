import { forwardRef, memo } from 'react';
import type { ElementType } from 'react';
import { cn } from '../../utils/cn';
import type { TextProps, TextVariant } from './Text.types';
import './Text.css';

/** Tag HTML padrao de cada variante (pode ser trocada via prop as). */
const defaultTag: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
};

const TextBase = forwardRef<HTMLElement, TextProps>(function Text(
  {
    variant = 'body',
    as,
    weight,
    color = 'default',
    align,
    truncate = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Tag: ElementType = as ?? defaultTag[variant];
  return (
    <Tag
      ref={ref}
      className={cn(
        'dui-text',
        `dui-text--${variant}`,
        weight && `dui-text--w-${weight}`,
        color !== 'default' && `dui-text--c-${color}`,
        align && `dui-text--${align}`,
        truncate && 'dui-text--truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export const Text = memo(TextBase);
Text.displayName = 'Text';
