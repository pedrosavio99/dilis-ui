import { useEffect, useMemo, useState } from 'react';
import { DilisSymbol, buildAgentDoc } from '@dilis/ui';
import { CodeBlock } from './CodeBlock';
import { collectManifests } from '../agent/collectManifests';

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
    code: `import { Button, DilisLogo } from '@dilis/ui';\n\n<Button variant="primary" size="lg">Enviar</Button>`,
  },
];

type Tab = 'passos' | 'agente';

/**
 * Atalho flutuante da mural. Abre um painel com duas abas:
 * - Passos: instalar e comecar em 3 passos.
 * - Para IA: guia de uso gerado automaticamente a partir dos manifests dos
 *   componentes, pronto pra colar no contexto de um agente e economizar token.
 */
export function UsageGuide() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('passos');

  const manifests = useMemo(() => collectManifests(), []);
  const agentDoc = useMemo(
    () => buildAgentDoc(manifests, { version: '0.1.0' }),
    [manifests],
  );

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
                  <span>Instale, ou pegue o guia pronto pra IA</span>
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

            <div className="guide-tabs" role="tablist" aria-label="Modo de uso">
              <button
                role="tab"
                aria-selected={tab === 'passos'}
                className={`guide-tab${tab === 'passos' ? ' guide-tab--active' : ''}`}
                onClick={() => setTab('passos')}
              >
                3 passos
              </button>
              <button
                role="tab"
                aria-selected={tab === 'agente'}
                className={`guide-tab${tab === 'agente' ? ' guide-tab--active' : ''}`}
                onClick={() => setTab('agente')}
              >
                Para IA
              </button>
            </div>

            <div className="guide-modal__body">
              {tab === 'passos' ? (
                <>
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
                </>
              ) : (
                <>
                  <p className="guide-note">
                    Guia gerado automaticamente a partir de {manifests.length}{' '}
                    componente(s). Copie e cole no contexto do seu agente pra ele
                    usar a lib sem receber o codigo fonte inteiro. Componente novo
                    com manifest entra aqui sozinho.
                  </p>
                  <CodeBlock lang="markdown" code={agentDoc} />
                </>
              )}
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
