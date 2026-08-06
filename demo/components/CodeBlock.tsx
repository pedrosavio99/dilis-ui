import { useState } from 'react';

interface CodeBlockProps {
  /** Codigo exibido e copiado. */
  code: string;
  /** Rotulo do canto (ex: tsx, bash). Padrao: tsx. */
  lang?: string;
}

/** Bloco de codigo com botao de copiar. Usado nos exemplos da mural. */
export function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__lang">{lang}</span>
        <button
          className="code__copy"
          onClick={copy}
          aria-label="Copiar codigo"
        >
          {copied ? 'copiado' : 'copiar'}
        </button>
      </div>
      <pre className="code__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}