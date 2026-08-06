import { useState } from 'react';
import { theme } from '@dilis/ui';

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (value: string) => {
    void navigator.clipboard?.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(null), 1200);
  };
  return { copied, copy };
}

interface SwatchRowProps {
  title: string;
  scale: Record<string | number, string>;
}

function SwatchRow({ title, scale }: SwatchRowProps) {
  const { copied, copy } = useCopy();
  return (
    <section className="block">
      <h3 className="block__title">{title}</h3>
      <div className="swatches">
        {Object.entries(scale).map(([step, hex]) => (
          <button
            key={step}
            className="swatch"
            onClick={() => copy(hex)}
            title={`Copiar ${hex}`}
          >
            <span className="swatch__chip" style={{ background: hex }} />
            <span className="swatch__step">{step}</span>
            <span className="swatch__hex">
              {copied === hex ? 'copiado' : hex}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ColorsView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Cores</h2>
        <p className="view__lead">
          Escalas geradas a partir das cores base do manual da marca. Clique
          num tom para copiar o hex.
        </p>
      </header>

      <SwatchRow title="Primary" scale={theme.colors.primary} />
      <SwatchRow title="Neutral" scale={theme.colors.neutral} />
      <SwatchRow title="Semanticas" scale={theme.colors.semantic} />
    </div>
  );
}
