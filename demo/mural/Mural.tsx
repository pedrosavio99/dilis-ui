import { groupEntries, registry } from './registry';
import { DilisLogo } from '@dilis/ui';

interface MuralProps {
  active: string;
  onSelect: (id: string) => void;
}

export function Mural({ active, onSelect }: MuralProps) {
  const groups = groupEntries(registry);

  return (
    <aside className="mural">
      <div className="mural__brand">
        <DilisLogo size={26} color="#ffffff" title="Dilis" />
        <span className="mural__version">Design System v0.1.0</span>
      </div>

      <nav className="mural__nav">
        {groups.map(([group, entries]) => (
          <div className="mural__group" key={group}>
            <span className="mural__group-label">{group}</span>
            {entries.map((entry) => (
              <button
                key={entry.id}
                className={
                  'mural__item' +
                  (active === entry.id ? ' mural__item--active' : '')
                }
                onClick={() => onSelect(entry.id)}
                aria-current={active === entry.id ? 'page' : undefined}
              >
                {entry.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="mural__foot">Design System</div>
    </aside>
  );
}