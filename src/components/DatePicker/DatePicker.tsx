import { forwardRef, memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ChangeEvent } from 'react';
import { cn } from '../../utils/cn';
import type { DatePickerOutput, DatePickerProps } from './DatePicker.types';
import './DatePicker.css';

const MESES = [
  'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const pad2 = (n: number) => String(n).padStart(2, '0');
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

/** Texto do campo (o que se digita e ve): dd/mm/aaaa [HH:mm]. */
function fieldText(d: Date, withTime: boolean): string {
  const base = `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;
  return withTime ? `${base} ${pad2(d.getHours())}:${pad2(d.getMinutes())}` : base;
}

/** Aplica a mascara nos digitos crus. */
function maskDate(digits: string, withTime: boolean): string {
  const d = digits.slice(0, withTime ? 12 : 8);
  let out = '';
  for (let i = 0; i < d.length; i += 1) {
    if (i === 2 || i === 4) out += '/';
    if (i === 8) out += ' ';
    if (i === 10) out += ':';
    out += d[i];
  }
  return out;
}

/** Tenta montar um Date valido a partir dos digitos. */
function parseFromDigits(digits: string, withTime: boolean): Date | null {
  const need = withTime ? 12 : 8;
  if (digits.length < need) return null;
  const day = Number(digits.slice(0, 2));
  const mon = Number(digits.slice(2, 4));
  const yr = Number(digits.slice(4, 8));
  const hh = withTime ? Number(digits.slice(8, 10)) : 0;
  const mm = withTime ? Number(digits.slice(10, 12)) : 0;
  if (mon < 1 || mon > 12 || day < 1 || day > 31) return null;
  if (hh > 23 || mm > 59 || yr < 1) return null;
  const d = new Date(yr, mon - 1, day, hh, mm);
  if (d.getFullYear() !== yr || d.getMonth() !== mon - 1 || d.getDate() !== day) return null;
  return d;
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

const DatePickerBase = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue,
    onChange,
    withTime = false,
    label,
    floatingLabel = false,
    placeholder,
    formatValue,
    minDate,
    maxDate,
    inputSize = 'md',
    accentColor,
    disabled,
    className,
    id,
    style,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const selected = isControlled ? value ?? null : internal;

  const seed = selected ?? new Date();
  const [text, setText] = useState(() =>
    selected ? fieldText(selected, withTime) : '',
  );
  const [viewYear, setViewYear] = useState(seed.getFullYear());
  const [viewMonth, setViewMonth] = useState(seed.getMonth());
  const [hour, setHour] = useState(selected ? selected.getHours() : 0);
  const [minute, setMinute] = useState(selected ? selected.getMinutes() : 0);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const showFloating = floatingLabel && Boolean(label);
  const labelUp = focused || text.length > 0;
  const hint = withTime ? 'dd/mm/aaaa hh:mm' : 'dd/mm/aaaa';
  const inputPlaceholder = showFloating ? (focused ? hint : '') : placeholder ?? hint;

  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-dp-accent': accentColor } : null),
  } as CSSProperties;

  // sincroniza texto e calendario quando controlado
  useEffect(() => {
    if (!isControlled) return;
    setText(value ? fieldText(value, withTime) : '');
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
      setHour(value.getHours());
      setMinute(value.getMinutes());
    }
  }, [value, isControlled, withTime]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function emit(date: Date | null) {
    const out: DatePickerOutput = {
      date,
      iso: date ? date.toISOString() : null,
      timestamp: date ? date.getTime() : null,
      formatted: date
        ? formatValue
          ? formatValue(date, withTime)
          : fieldText(date, withTime)
        : '',
    };
    if (!isControlled) setInternal(date);
    onChange?.(out);
  }

  const isDisabledDay = (d: Date) => {
    if (minDate && startOfDay(d) < startOfDay(minDate)) return true;
    if (maxDate && startOfDay(d) > startOfDay(maxDate)) return true;
    return false;
  };

  // digitacao com mascara
  function handleType(e: ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '');
    setText(maskDate(digits, withTime));
    if (digits.length === 0) {
      emit(null);
      return;
    }
    const parsed = parseFromDigits(digits, withTime);
    if (parsed) {
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
      setHour(parsed.getHours());
      setMinute(parsed.getMinutes());
      emit(parsed);
    }
  }

  function pickDay(day: number) {
    const date = new Date(viewYear, viewMonth, day, withTime ? hour : 0, withTime ? minute : 0);
    if (isDisabledDay(date)) return;
    setText(fieldText(date, withTime));
    emit(date);
    if (!withTime) setOpen(false);
  }

  function changeHour(e: ChangeEvent<HTMLInputElement>) {
    const h = Math.min(23, Math.max(0, Number(e.target.value) || 0));
    setHour(h);
    if (selected) {
      const d = new Date(selected);
      d.setHours(h);
      setText(fieldText(d, withTime));
      emit(d);
    }
  }
  function changeMinute(e: ChangeEvent<HTMLInputElement>) {
    const m = Math.min(59, Math.max(0, Number(e.target.value) || 0));
    setMinute(m);
    if (selected) {
      const d = new Date(selected);
      d.setMinutes(m);
      setText(fieldText(d, withTime));
      emit(d);
    }
  }

  function clear() {
    setText('');
    emit(null);
    setOpen(false);
  }

  function prevMonth() {
    setViewMonth((m) => (m === 0 ? 11 : m - 1));
    setViewYear((y) => (viewMonth === 0 ? y - 1 : y));
  }
  function nextMonth() {
    setViewMonth((m) => (m === 11 ? 0 : m + 1));
    setViewYear((y) => (viewMonth === 11 ? y + 1 : y));
  }

  const cells = useMemo(() => {
    const startWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const arr: Array<number | null> = [];
    for (let i = 0; i < startWeekday; i += 1) arr.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) arr.push(d);
    return arr;
  }, [viewYear, viewMonth]);

  const today = new Date();

  return (
    <div
      className={cn(
        'dui-dp',
        `dui-dp--${inputSize}`,
        showFloating && 'dui-dp--floating',
        labelUp && 'dui-dp--label-up',
        open && 'dui-dp--open',
        disabled && 'dui-dp--disabled',
        className,
      )}
      style={styleWithAccent}
    >
      <div ref={wrapperRef}>
        {label && !showFloating ? (
          <label className="dui-dp__top-label" htmlFor={fieldId}>
            {label}
          </label>
        ) : null}

        <div className="dui-dp__control">
          <button
            type="button"
            className="dui-dp__icon"
            aria-label="Abrir calendario"
            disabled={disabled}
            onClick={() => setOpen((o) => !o)}
          >
            <CalendarIcon />
          </button>

          <input
            ref={ref}
            id={fieldId}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className="dui-dp__field"
            value={text}
            placeholder={inputPlaceholder}
            disabled={disabled}
            onChange={handleType}
            onFocus={() => {
              setFocused(true);
              setOpen(true);
            }}
            onClick={() => setOpen(true)}
            onBlur={() => setFocused(false)}
            aria-haspopup="dialog"
            aria-expanded={open}
            {...rest}
          />

          {showFloating ? (
            <label className="dui-dp__label" htmlFor={fieldId}>
              {label}
            </label>
          ) : null}

          {text.length > 0 && !disabled ? (
            <button type="button" className="dui-dp__clear" aria-label="Limpar data" onClick={clear}>
              <ClearIcon />
            </button>
          ) : null}

          <span className="dui-dp__line" aria-hidden="true" />
        </div>

        {open ? (
          <div className="dui-dp__pop" role="dialog" aria-label="Calendario">
            <div className="dui-dp__header">
              <button type="button" className="dui-dp__nav" aria-label="Mes anterior" onClick={prevMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="dui-dp__month">{MESES[viewMonth]} {viewYear}</span>
              <button type="button" className="dui-dp__nav" aria-label="Proximo mes" onClick={nextMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="dui-dp__weekdays">
              {DIAS.map((d) => (
                <span key={d} className="dui-dp__weekday">{d}</span>
              ))}
            </div>

            <div className="dui-dp__grid">
              {cells.map((day, i) => {
                if (day === null) return <span key={`e${i}`} className="dui-dp__cell dui-dp__cell--empty" />;
                const dayDate = new Date(viewYear, viewMonth, day);
                const isSel = selected ? sameDay(selected, dayDate) : false;
                const isToday = sameDay(today, dayDate);
                const off = isDisabledDay(dayDate);
                return (
                  <button
                    key={day}
                    type="button"
                    className={cn(
                      'dui-dp__cell',
                      'dui-dp__day',
                      isSel && 'dui-dp__day--selected',
                      isToday && !isSel && 'dui-dp__day--today',
                    )}
                    disabled={off}
                    aria-pressed={isSel}
                    onClick={() => pickDay(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {withTime ? (
              <div className="dui-dp__time">
                <span className="dui-dp__time-label">Hora</span>
                <input
                  type="number"
                  className="dui-dp__time-input"
                  min={0}
                  max={23}
                  value={pad2(hour)}
                  onChange={changeHour}
                  aria-label="Hora"
                />
                <span className="dui-dp__time-sep">:</span>
                <input
                  type="number"
                  className="dui-dp__time-input"
                  min={0}
                  max={59}
                  value={pad2(minute)}
                  onChange={changeMinute}
                  aria-label="Minuto"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export const DatePicker = memo(DatePickerBase);
DatePicker.displayName = 'DatePicker';
