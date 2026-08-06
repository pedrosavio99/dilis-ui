import { useEffect, useState } from 'react';
import { DilisSymbol } from '@dilis/ui';
import { CodeBlock } from './CodeBlock';

const REPO_URL = 'https://github.com/pedrosavio99/dilis-ui';
const MURAL_URL = 'https://dilisui.netlify.app';

const steps = [
  {
    title: 'Instalar no seu projeto',
    lang: 'bash',
    code: `npm install git+https://github.com/pedrosavio99/dilis-ui.git`,
  },
  {
    title: 'Importar os estilos uma vez (no entry do app)',
    lang: 'tsx',
    code: `import '@dilis/ui/styles.css';`,
  },
  {
    title: 'Usar os componentes',
    lang: 'tsx',
    code: `import { Button, DilisLogo } from '@dilis/ui';

<Button variant="primary" size="lg">Enviar</Button>`,
  },
];

/**
 * Atalho flutuante da mural. Abre um painel com o passo a passo de uso
 * da lib, com codigo pronto pra copiar e os links do repo e da mural.
 */
export function UsageGuide() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className="guide-fab"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Como usar
      </button>

      {open ? (
        <div
          className="guide-overlay"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="guide-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Como usar a Dilis UI"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="guide-modal__head">
              <div className="guide-modal__title">
                <DilisSymbol size={26} />
                <div>
                  <strong>Como usar a Dilis UI</strong>
                  <span>Instale e comece em 3 passos</span>
                </div>
              </div>
              <button
                className="guide-modal__close"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="guide-modal__body">
              {steps.map((step, i) => (
                <div className="guide-step" key={step.title}>
                  <div className="guide-step__label">
                    <span className="guide-step__num">{i + 1}</span>
                    {step.title}
                  </div>
                  <CodeBlock lang={step.lang} code={step.code} />
                </div>
              ))}

              <p className="guide-note">
                Repositorio privado: o install via git precisa de acesso
                autenticado ao GitHub (SSH ou token) na maquina ou no CI.
              </p>
            </div>

            <footer className="guide-modal__foot">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                Repositorio
              </a>
              <a href={MURAL_URL} target="_blank" rel="noreferrer">
                Mural online
              </a>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}