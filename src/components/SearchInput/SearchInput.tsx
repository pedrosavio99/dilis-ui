import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import type {
  CSSProperties,
  ChangeEvent,
  ForwardedRef,
  KeyboardEvent,
  ReactElement,
  Ref,
} from 'react';
import { cn } from '../../utils/cn';
import type { SearchInputProps } from './SearchInput.types';
import './SearchInput.css';

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchInputInner<T>(
  {
    fetchOptions,
    getOptionLabel,
    getOptionKey,
    onSelect,
    onQueryChange,
    renderOption,
    minChars = 1,
    debounceMs = 300,
    emptyMessage = 'Nada encontrado',
    label,
    floatingLabel = false,
    inputSize = 'md',
    accentColor,
    placeholder,
    disabled,
    className,
    id,
    style,
    onKeyDown,
    ...rest
  }: SearchInputProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
): ReactElement {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;

  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<T[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLInputElement | null>(null);
  const reqIdRef = useRef(0);
  const timerRef = useRef<number | undefined>(undefined);

  const showFloating = floatingLabel && Boolean(label);

  const assignRef = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-search-accent': accentColor } : null),
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

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function runSearch(q: string) {
    const reqId = reqIdRef.current + 1;
    reqIdRef.current = reqId;
    setLoading(true);
    Promise.resolve(fetchOptions(q))
      .then((res) => {
        if (reqId !== reqIdRef.current) return; // ignora resposta fora de ordem
        setOptions(res);
        setOpen(true);
        setActiveIndex(res.length > 0 ? 0 : -1);
      })
      .catch(() => {
        if (reqId !== reqIdRef.current) return;
        setOptions([]);
        setOpen(true);
      })
      .finally(() => {
        if (reqId === reqIdRef.current) setLoading(false);
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    onQueryChange?.(v);
    window.clearTimeout(timerRef.current);
    if (v.trim().length < minChars) {
      setOptions([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    timerRef.current = window.setTimeout(() => runSearch(v), debounceMs);
  }

  function select(item: T) {
    setQuery(getOptionLabel(item));
    setOptions([]);
    setOpen(false);
    setActiveIndex(-1);
    onSelect?.(item);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open && options.length > 0) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && activeIndex >= 0 && options[activeIndex]) {
        e.preventDefault();
        select(options[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
    onKeyDown?.(e);
  }

  function handleClear() {
    setQuery('');
    setOptions([]);
    setOpen(false);
    setActiveIndex(-1);
    onQueryChange?.('');
    innerRef.current?.focus();
  }

  const activeId = activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        'dui-search',
        `dui-search--${inputSize}`,
        showFloating && 'dui-search--floating',
        disabled && 'dui-search--disabled',
        className,
      )}
      style={styleWithAccent}
    >
      {label && !showFloating ? (
        <label className="dui-search__top-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}

      <div className="dui-search__control">
        <span className="dui-search__icon">
          <SearchIcon />
        </span>

        <input
          ref={assignRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          autoComplete="off"
          className="dui-search__field"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (options.length > 0) setOpen(true);
          }}
          disabled={disabled}
          placeholder={showFloating ? ' ' : placeholder ?? 'Buscar'}
          {...rest}
        />

        {showFloating ? (
          <label className="dui-search__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}

        {query ? (
          <button
            type="button"
            className="dui-search__clear"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Limpar busca"
          >
            <ClearIcon />
          </button>
        ) : null}

        <span className="dui-search__line" aria-hidden="true" />
      </div>

      {open ? (
        <ul className="dui-search__list" id={listId} role="listbox">
          {loading ? (
            <li className="dui-search__status">Buscando...</li>
          ) : options.length === 0 ? (
            <li className="dui-search__status">{emptyMessage}</li>
          ) : (
            options.map((item, i) => {
              const key = getOptionKey ? getOptionKey(item) : getOptionLabel(item);
              const active = i === activeIndex;
              return (
                <li
                  key={key}
                  id={`${listId}-opt-${i}`}
                  role="option"
                  aria-selected={active}
                  className={cn(
                    'dui-search__option',
                    active && 'dui-search__option--active',
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    select(item);
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {renderOption ? renderOption(item) : getOptionLabel(item)}
                </li>
              );
            })
          )}
        </ul>
      ) : null}
    </div>
  );
}

// forwardRef nao preserva o generico; encapsulamos e castamos de volta pra
// manter <T> nas chamadas. memo foi omitido de proposito: com generico +
// forwardRef ele exigiria casts feios e traria pouco ganho aqui.
export const SearchInput = forwardRef(SearchInputInner) as <T>(
  props: SearchInputProps<T> & { ref?: Ref<HTMLInputElement> },
) => ReactElement;

(SearchInput as { displayName?: string }).displayName = 'SearchInput';
