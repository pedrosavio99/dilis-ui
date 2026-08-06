import { forwardRef, Fragment, useState } from 'react';
import type { CSSProperties, ForwardedRef, ReactElement, Ref } from 'react';
import { cn } from '../../utils/cn';
import type { TableProps } from './Table.types';
import './Table.css';

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Monta os itens de paginacao com reticencias quando ha muitas paginas. */
function getPageItems(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | 'ellipsis'> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push('ellipsis');
  for (let p = left; p <= right; p += 1) items.push(p);
  if (right < total - 1) items.push('ellipsis');
  items.push(total);
  return items;
}

function TableInner<T>(
  {
    data,
    columns,
    getRowKey,
    expandable = false,
    renderExpanded,
    pageSize,
    page,
    onPageChange,
    size = 'md',
    accentColor,
    emptyMessage = 'Nada pra mostrar',
    className,
    style,
    ...rest
  }: TableProps<T>,
  ref: ForwardedRef<HTMLTableElement>,
): ReactElement {
  const [expanded, setExpanded] = useState<Set<string | number>>(new Set());

  const isPaginated = typeof pageSize === 'number' && pageSize > 0;
  const isControlledPage = page !== undefined;
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = isControlledPage ? (page as number) : internalPage;

  const totalPages = isPaginated
    ? Math.max(1, Math.ceil(data.length / (pageSize as number)))
    : 1;
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = isPaginated ? (safePage - 1) * (pageSize as number) : 0;
  const pageData = isPaginated ? data.slice(start, start + (pageSize as number)) : data;

  const colSpanAll = columns.length + (expandable ? 1 : 0);

  const styleWithAccent = {
    ...style,
    ...(accentColor ? { '--dui-table-accent': accentColor } : null),
  } as CSSProperties;

  function goTo(p: number) {
    const np = Math.min(Math.max(1, p), totalPages);
    if (!isControlledPage) setInternalPage(np);
    onPageChange?.(np);
  }

  function toggleRow(key: string | number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className={cn('dui-table', `dui-table--${size}`, className)} style={styleWithAccent}>
      <table ref={ref} className="dui-table__table" {...rest}>
        <thead>
          <tr>
            {expandable ? <th className="dui-table__th dui-table__th--toggle" aria-hidden="true" /> : null}
            {columns.map((col) => (
              <th
                key={col.id}
                scope="col"
                className={cn('dui-table__th', col.align && `dui-table__th--${col.align}`)}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td className="dui-table__empty" colSpan={colSpanAll}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            pageData.map((item, i) => {
              const key = getRowKey(item, start + i);
              const isOpen = expandable && expanded.has(key);
              return (
                <Fragment key={key}>
                  <tr
                    className={cn(
                      'dui-table__row',
                      expandable && 'dui-table__row--clickable',
                      isOpen && 'dui-table__row--open',
                    )}
                    onClick={expandable ? () => toggleRow(key) : undefined}
                  >
                    {expandable ? (
                      <td className="dui-table__td dui-table__td--toggle">
                        <button
                          type="button"
                          className="dui-table__toggle"
                          aria-expanded={isOpen}
                          aria-label={isOpen ? 'Recolher linha' : 'Expandir linha'}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(key);
                          }}
                        >
                          <Chevron />
                        </button>
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn('dui-table__td', col.align && `dui-table__td--${col.align}`)}
                      >
                        {col.cell(item)}
                      </td>
                    ))}
                  </tr>
                  {isOpen ? (
                    <tr>
                      <td className="dui-table__expanded" colSpan={colSpanAll}>
                        {renderExpanded ? renderExpanded(item) : null}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })
          )}
        </tbody>
      </table>

      {isPaginated && totalPages > 1 ? (
        <nav className="dui-table__pagination" aria-label="Paginacao">
          <button
            type="button"
            className="dui-table__page-btn"
            onClick={() => goTo(safePage - 1)}
            disabled={safePage <= 1}
            aria-label="Pagina anterior"
          >
            <ChevronLeft />
          </button>
          {getPageItems(safePage, totalPages).map((it, i) =>
            it === 'ellipsis' ? (
              <span key={`e${i}`} className="dui-table__ellipsis">
                ...
              </span>
            ) : (
              <button
                key={it}
                type="button"
                className={cn('dui-table__page-btn', it === safePage && 'dui-table__page-btn--active')}
                aria-current={it === safePage ? 'page' : undefined}
                onClick={() => goTo(it)}
              >
                {it}
              </button>
            ),
          )}
          <button
            type="button"
            className="dui-table__page-btn"
            onClick={() => goTo(safePage + 1)}
            disabled={safePage >= totalPages}
            aria-label="Proxima pagina"
          >
            <ChevronRight />
          </button>
        </nav>
      ) : null}
    </div>
  );
}

// forwardRef nao preserva o generico; encapsulamos e castamos de volta.
export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: Ref<HTMLTableElement> },
) => ReactElement;

(Table as { displayName?: string }).displayName = 'Table';
