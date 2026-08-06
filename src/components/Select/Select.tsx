import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type {
  CSSProperties,
  ForwardedRef,
  KeyboardEvent,
  ReactElement,
  Ref,
} from 'react';
import { cn } from '../../utils/cn';
import type { SelectProps } from './Select.types';
import './Select.css';

function ChevronIcon() {
  return (
    <svg
      className="dui-select__chevron"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="dui-select__check" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SelectInner<T>(
  {
    options,
    value,
    defaultValue,
    onChange,
    getOptionLabel,
    getOptionValue,
    renderOption,
    placeholder = 'Selecione',
    label,
    floatingLabel = false,
    selectSize = 'md',
    accentColor,
    error,
    hint,
    disabled,
    className,
    id,
    style,
    onKeyDown,
    ...rest
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLButtonElement>,
): ReactElement {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const listId = `${triggerId}-list`;
  const message = error ?? hint;
  const messageId = message ? `${triggerId}-msg` : undefined;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const showFloating = floatingLabel && Boolean(label);
  const keyOf = (item: T): string | number =>
    getOptionValue ? getOptionValue(item) : getOptionLabel(item);
  const selectedKey = selected != null ? keyOf(selected) : undefined;
  const filled = selected != null;

  const assignRef = (node: HTMLButtonElement | null) => {
    triggerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-select-accent': accentColor } : null),
  } as CSSProperties;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function openList() {
    if (disabled) return;
    const selIndex = options.findIndex((o) => keyOf(o) === selectedKey);
    setActiveIndex(selIndex >= 0 ? selIndex : 0);
    setOpen(true);
  }

  function closeList() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function choose(item: T) {
    if (!isControlled) setInternal(item);
    onChange?.(item);
    closeList();
    triggerRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) openList();
      else setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) openList();
      else setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) openList();
      else if (activeIndex >= 0 && options[activeIndex]) choose(options[activeIndex]);
    } else if (e.key === 'Escape') {
      closeList();
    } else if (e.key === 'Home' && open) {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End' && open) {
      e.preventDefault();
      setActiveIndex(options.length - 1);
    }
    onKeyDown?.(e);
  }

  const activeId = activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'dui-select',
        `dui-select--${selectSize}`,
        showFloating && 'dui-select--floating',
        open && 'dui-select--open',
        filled && 'dui-select--filled',
        error && 'dui-select--error',
        disabled && 'dui-select--disabled',
        className,
      )}
      style={styleWithAccent}
    >
      {label && !showFloating ? (
        <label className="dui-select__top-label" htmlFor={triggerId}>
          {label}
        </label>
      ) : null}

      <div className="dui-select__control">
        <button
          ref={assignRef}
          id={triggerId}
          type="button"
          className="dui-select__trigger"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-invalid={error ? true : undefined}
          aria-describedby={messageId}
          disabled={disabled}
          onClick={() => (open ? closeList() : openList())}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <span
            className={cn(
              'dui-select__value',
              !filled && !showFloating && 'dui-select__value--placeholder',
            )}
          >
            {filled ? getOptionLabel(selected as T) : showFloating ? '' : placeholder}
          </span>
          <ChevronIcon />
        </button>

        {showFloating ? (
          <label className="dui-select__label" htmlFor={triggerId}>
            {label}
          </label>
        ) : null}

        <span className="dui-select__line" aria-hidden="true" />
      </div>

      {open ? (
        <ul className="dui-select__list" id={listId} role="listbox">
          {options.map((item, i) => {
            const k = keyOf(item);
            const isSelected = k === selectedKey;
            const active = i === activeIndex;
            return (
              <li
                key={k}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'dui-select__option',
                  active && 'dui-select__option--active',
                  isSelected && 'dui-select__option--selected',
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(item);
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span>{renderOption ? renderOption(item) : getOptionLabel(item)}</span>
                {isSelected ? <CheckIcon /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {message ? (
        <span id={messageId} className="dui-select__message">
          {message}
        </span>
      ) : null}
    </div>
  );
}

// forwardRef nao preserva o generico; encapsulamos e castamos de volta pra
// manter <T> nas chamadas. memo omitido de proposito (generico + forwardRef).
export const Select = forwardRef(SelectInner) as <T>(
  props: SelectProps<T> & { ref?: Ref<HTMLButtonElement> },
) => ReactElement;

(Select as { displayName?: string }).displayName = 'Select';
