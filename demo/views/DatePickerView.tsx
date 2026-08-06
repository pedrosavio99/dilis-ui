import { useState } from 'react';
import { DatePicker } from '@dilis/ui';
import type { DatePickerOutput } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

export function DatePickerView() {
  const [out1, setOut1] = useState<DatePickerOutput | null>(null);
  const [out2, setOut2] = useState<DatePickerOutput | null>(null);

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">DatePicker</h2>
        <p className="view__lead">
          Da pra <strong>digitar</strong> com mascara (dd/mm/aaaa) ou{' '}
          <strong>escolher no calendario</strong> pela lupa. Hora opcional com{' '}
          <code>withTime</code>. O <code>onChange</code> entrega o valor em varios
          formatos ao mesmo tempo: <code>date</code>, <code>iso</code>,{' '}
          <code>timestamp</code> e <code>formatted</code>.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { DatePicker } from '@dilis/ui';`} />
      </div>

      <Example
        title="Digitar ou escolher (label flutuante)"
        code={`<DatePicker
  label="Data de nascimento"
  floatingLabel
  onChange={(out) => console.log(out.iso)}
/>`}
      >
        <div style={{ maxWidth: 320, width: '100%' }}>
          <DatePicker label="Data de nascimento" floatingLabel onChange={setOut1} />
          {out1?.date ? (
            <div style={{ marginTop: '0.75rem', fontSize: 13, color: 'var(--dui-color-neutral-600)' }}>
              <div>formatted: {out1.formatted}</div>
              <div>iso: {out1.iso}</div>
              <div>timestamp: {out1.timestamp}</div>
            </div>
          ) : null}
        </div>
      </Example>

      <Example
        title="Data e hora (mascara dd/mm/aaaa hh:mm)"
        code={`<DatePicker
  label="Agendar para"
  withTime
  accentColor="#1aa053"
  onChange={(out) => setValor(out.date)}
/>`}
      >
        <div style={{ maxWidth: 340, width: '100%' }}>
          <DatePicker label="Agendar para" withTime accentColor="#1aa053" onChange={setOut2} />
          {out2?.date ? (
            <div style={{ marginTop: '0.75rem', fontSize: 13, color: 'var(--dui-color-neutral-600)' }}>
              <div>formatted: {out2.formatted}</div>
              <div>iso: {out2.iso}</div>
            </div>
          ) : null}
        </div>
      </Example>

      <Example
        title="Sem label flutuante (placeholder mostra o formato)"
        code={`<DatePicker label="Vencimento" />`}
      >
        <div style={{ maxWidth: 320, width: '100%' }}>
          <DatePicker label="Vencimento" />
        </div>
      </Example>
    </div>
  );
}
