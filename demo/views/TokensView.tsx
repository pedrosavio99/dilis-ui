import { theme } from '@dilis/ui';

export function TokensView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Tokens</h2>
        <p className="view__lead">
          Valores base que alimentam todos os componentes. No CSS eles viram
          variaveis <code>--dui-*</code>. No JS ficam no objeto{' '}
          <code>theme</code>.
        </p>
      </header>

      <section className="block">
        <h3 className="block__title">Tipografia</h3>
        <div className="type-list">
          {Object.entries(theme.typography.fontSize).map(([name, size]) => (
            <div className="type-row" key={name}>
              <span className="type-row__meta">
                {name} / {size}
              </span>
              <span className="type-row__sample" style={{ fontSize: size }}>
                Dilis Studio
              </span>
            </div>
          ))}
        </div>
        <div className="weights">
          {Object.entries(theme.typography.fontWeight).map(([name, w]) => (
            <span className="weight" key={name} style={{ fontWeight: w }}>
              {name} {w}
            </span>
          ))}
        </div>
      </section>

      <section className="block">
        <h3 className="block__title">Espacamento</h3>
        <div className="scale">
          {Object.entries(theme.spacing).map(([name, value]) => (
            <div className="scale-row" key={name}>
              <span className="scale-row__meta">
                {name} / {value}
              </span>
              <span className="scale-row__bar" style={{ width: value }} />
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h3 className="block__title">Radius</h3>
        <div className="tiles">
          {Object.entries(theme.radius).map(([name, value]) => (
            <div className="tile" key={name}>
              <span
                className="tile__box"
                style={{ borderRadius: value === '9999px' ? '999px' : value }}
              />
              <span className="tile__meta">
                {name} / {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="block">
        <h3 className="block__title">Sombras</h3>
        <div className="tiles">
          {Object.entries(theme.shadow)
            .filter(([name]) => name !== 'none')
            .map(([name, value]) => (
              <div className="tile" key={name}>
                <span className="tile__box tile__box--flat" style={{ boxShadow: value }} />
                <span className="tile__meta">{name}</span>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
