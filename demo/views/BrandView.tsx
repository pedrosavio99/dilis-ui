import { DilisLogo, DilisSymbol, Icon } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';


export function BrandView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Marca</h2>
        <p className="view__lead">
          Logo e simbolo da Dilis como componentes. A cor vem de{' '}
          <code>currentColor</code> (padrao no azul da marca), entao da pra
          usar em qualquer fundo so trocando a cor.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock
          lang="tsx"
          code={`import { DilisLogo, DilisSymbol, Icon } from '@dilis/ui';`}
        />
      </div>

      <Example
        title="DilisLogo (nome completo)"
        center
        code={`<DilisLogo size={40} />
<DilisLogo size={40} color="#333333" />
<DilisLogo size={40} color="#ffffff" />`}
      >
        <div className="brand-strip">
          <div className="brand-cell">
            <DilisLogo size={40} />
            <span className="brand-cell__meta">padrao</span>
          </div>
          <div className="brand-cell">
            <DilisLogo size={40} color="#333333" />
            <span className="brand-cell__meta">chumbo</span>
          </div>
          <div className="brand-cell brand-cell--dark">
            <DilisLogo size={40} color="#ffffff" />
            <span className="brand-cell__meta">negativo</span>
          </div>
        </div>
      </Example>

      <Example
        title="DilisSymbol (marca reduzida)"
        center
        code={`<DilisSymbol size={44} />
<DilisSymbol size={44} color="#ffffff" />
<DilisSymbol size={22} />`}
      >
        <div className="brand-strip">
          <div className="brand-cell">
            <DilisSymbol size={44} />
            <span className="brand-cell__meta">padrao</span>
          </div>
          <div className="brand-cell brand-cell--dark">
            <DilisSymbol size={44} color="#ffffff" />
            <span className="brand-cell__meta">negativo</span>
          </div>
          <div className="brand-cell">
            <DilisSymbol size={22} />
            <span className="brand-cell__meta">favicon 22px</span>
          </div>
        </div>
      </Example>

      <Example
        title="Icon (wrapper generico)"
        code={`<Icon label="seta" color="#009fe3">
  <path
    d="M5 12h14M13 6l6 6-6 6"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Icon>`}
      >
        <div className="row">
          <Icon label="seta" color="#009fe3">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
          <Icon label="check" size={28} color="#1aa053">
            <path
              d="M4 12l5 5L20 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
          <Icon label="fechar" size={20} color="#e4123b">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </Icon>
        </div>
      </Example>
    </div>
  );
}