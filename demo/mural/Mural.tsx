import { useMemo, useState } from 'react';
import { groupEntries, registry } from './registry';
import { DilisLogo } from '@dilis/ui';

interface MuralProps {
  active: string;
  onSelect: (id: string) => void;
}

export function Mural({ active, onSelect }: MuralProps) {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? registry.filter((e) => e.label.toLowerCase().includes(q))
      : registry;
    return groupEntries(filtered);
  }, [query]);

  const total = groups.reduce((n, [, entries]) => n + entries.length, 0);

  return (
    <aside className="mural">
      <div className="mural__brand">
        <DilisLogo size={26} color="#ffffff" title="Dilis" />
        <span className="mural__version">Design System v0.1.0</span>
      </div>

      <div className="mural__search">
        <svg
          className="mural__search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          className="mural__search-input"
          placeholder="Buscar componente"
          aria-label="Buscar componente"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query ? (
          <button
            type="button"
            className="mural__search-clear"
            aria-label="Limpar busca"
            onClick={() => setQuery('')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        ) : null}
      </div>

      <nav className="mural__nav">
        {total === 0 ? (
          <p className="mural__empty">Nenhum componente encontrado</p>
        ) : (
          groups.map(([group, entries]) => (
            <div className="mural__group" key={group}>
              <span className="mural__group-label">{group}</span>
              {entries.map((entry) => (
                <button
                  key={entry.id}
                  className={
                    'mural__item' + (active === entry.id ? ' mural__item--active' : '')
                  }
                  onClick={() => onSelect(entry.id)}
                  aria-current={active === entry.id ? 'page' : undefined}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          ))
        )}
      </nav>

      <div className="mural__foot">Design System</div>
    </aside>
  );
}
