import { forwardRef, memo, useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarProps } from './Avatar.types';
import './Avatar.css';

/** Pega 1 ou 2 letras: inicial do primeiro e do ultimo nome. */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/** Index de cor deterministico a partir do nome (0 a 4). */
function colorIndex(name: string): number {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return sum % 5;
}

function FallbackIcon() {
  return (
    <svg className="dui-avatar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 20c0-4 4-6 8-6s8 2 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const AvatarBase = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, alt, size = 'md', className, ...rest },
  ref,
) {
  const [imgError, setImgError] = useState(false);

  // reseta o erro se a imagem mudar
  useEffect(() => {
    setImgError(false);
  }, [src]);

  const showImage = Boolean(src) && !imgError;
  const initials = name ? getInitials(name) : '';
  const colorClass =
    !showImage && initials ? `dui-avatar--c${colorIndex(name ?? '')}` : undefined;

  const a11y = showImage
    ? {}
    : { role: 'img' as const, 'aria-label': name || alt || 'Avatar' };

  return (
    <span
      ref={ref}
      className={cn('dui-avatar', `dui-avatar--${size}`, colorClass, className)}
      {...a11y}
      {...rest}
    >
      {showImage ? (
        <img
          className="dui-avatar__img"
          src={src}
          alt={alt ?? name ?? ''}
          onError={() => setImgError(true)}
        />
      ) : initials ? (
        <span className="dui-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      ) : (
        <FallbackIcon />
      )}
    </span>
  );
});

export const Avatar = memo(AvatarBase);
Avatar.displayName = 'Avatar';
