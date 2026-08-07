import { useState } from 'react';
import { Modal, Button } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

export function ModalView() {
  const [confirm, setConfirm] = useState(false);
  const [big, setBig] = useState(false);
  const [plain, setPlain] = useState(false);

  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Modal</h2>
        <p className="view__lead">
          Janela sobreposta renderizada por portal. Controlada por{' '}
          <code>open</code>/<code>onClose</code>. Fecha no X, no scrim e no{' '}
          <code>Esc</code>, trava o scroll do fundo e prende o foco dentro dela.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Modal } from '@dilis/ui';`} />
      </div>

      <Example
        title="Confirmacao com acoes no rodape"
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Excluir</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Excluir registro"
  description="Essa acao nao pode ser desfeita."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button variant="danger" onClick={() => setOpen(false)}>Excluir</Button>
    </>
  }
>
  Tem certeza que quer excluir este item?
</Modal>`}
      >
        <Button variant="danger" onClick={() => setConfirm(true)}>
          Excluir registro
        </Button>
        <Modal
          open={confirm}
          onClose={() => setConfirm(false)}
          title="Excluir registro"
          description="Essa acao nao pode ser desfeita."
          footer={
            <>
              <Button variant="ghost" onClick={() => setConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => setConfirm(false)}>
                Excluir
              </Button>
            </>
          }
        >
          Tem certeza que quer excluir este item? Todos os dados vinculados
          tambem serao removidos.
        </Modal>
      </Example>

      <Example
        title="Tamanho grande (size='lg')"
        code={`<Modal open={open} onClose={close} title="Detalhes" size="lg">
  ...conteudo...
</Modal>`}
      >
        <Button variant="outline" onClick={() => setBig(true)}>
          Abrir grande
        </Button>
        <Modal
          open={big}
          onClose={() => setBig(false)}
          title="Detalhes do evento"
          size="lg"
          footer={<Button onClick={() => setBig(false)}>Fechar</Button>}
        >
          <p style={{ margin: 0 }}>
            Painel largo pra conteudo mais denso: formularios, tabelas ou uma
            midia maior. O corpo rola sozinho quando passa da altura.
          </p>
        </Modal>
      </Example>

      <Example
        title="So conteudo, sem titulo"
        code={`<Modal open={open} onClose={close} showClose>
  <p>Uma mensagem rapida.</p>
</Modal>`}
      >
        <Button variant="secondary" onClick={() => setPlain(true)}>
          Abrir simples
        </Button>
        <Modal open={plain} onClose={() => setPlain(false)} size="sm">
          <p style={{ margin: 0 }}>
            Um modal enxuto, so com a mensagem e o X pra fechar.
          </p>
        </Modal>
      </Example>
    </div>
  );
}
