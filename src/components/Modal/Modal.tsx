import { forwardRef, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import type { ModalProps } from './Modal.types';
import './Modal.css';

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const ModalBase = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    description,
    footer,
    size = 'md',
    closeOnScrim = true,
    closeOnEsc = true,
    showClose = true,
    children,
    className,
    id,
    ...rest
  },
  ref,
) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<Element | null>(null);
  const autoId = useId();
  const baseId = id ?? autoId;
  const titleId = title ? `${baseId}-title` : undefined;
  const descId = description ? `${baseId}-desc` : undefined;

  const setPanel = (node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && closeOnEsc) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey, true);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = prevOverflow;
      if (lastActiveRef.current instanceof HTMLElement) lastActiveRef.current.focus();
    };
  }, [open, closeOnEsc, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const hasHeader = Boolean(title) || showClose;

  return createPortal(
    <div
      className="dui-modal"
      onMouseDown={(e) => {
        if (closeOnScrim && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={setPanel}
        id={baseId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className={cn('dui-modal__panel', `dui-modal__panel--${size}`, className)}
        {...rest}
      >
        {hasHeader ? (
          <div className="dui-modal__header">
            <div className="dui-modal__heading">
              {title ? (
                <h2 className="dui-modal__title" id={titleId}>
                  {title}
                </h2>
              ) : null}
              {description ? (
                <p className="dui-modal__desc" id={descId}>
                  {description}
                </p>
              ) : null}
            </div>
            {showClose ? (
              <button type="button" className="dui-modal__close" aria-label="Fechar" onClick={onClose}>
                <CloseIcon />
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="dui-modal__body">{children}</div>

        {footer ? <div className="dui-modal__footer">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
});

export const Modal = ModalBase;
Modal.displayName = 'Modal';
