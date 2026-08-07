import type { ComponentManifest } from '../../meta/manifest.types';

export const modalManifest: ComponentManifest = {
  name: 'Modal',
  group: 'Componentes',
  summary:
    'Janela sobreposta (dialog) renderizada por portal. Controlada por open/onClose. Fecha no X, no scrim e no Esc, trava o scroll do fundo e faz o foco ficar preso dentro dela.',
  import: "import { Modal } from '@dilis/ui';",
  props: [
    {
      name: 'open',
      type: 'boolean',
      required: true,
      description: 'Controla a visibilidade.',
    },
    {
      name: 'onClose',
      type: '() => void',
      required: true,
      description: 'Chamado quando pede pra fechar (X, scrim ou Esc).',
    },
    {
      name: 'title',
      type: 'ReactNode',
      description: 'Titulo (vira o aria-labelledby).',
    },
    {
      name: 'description',
      type: 'ReactNode',
      description: 'Subtitulo curto abaixo do titulo.',
    },
    {
      name: 'footer',
      type: 'ReactNode',
      description: 'Area de acoes no rodape (ex: botoes).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: 'Largura maxima do painel.',
    },
    {
      name: 'closeOnScrim',
      type: 'boolean',
      default: 'true',
      description: 'Fecha ao clicar fora do painel.',
    },
    {
      name: 'closeOnEsc',
      type: 'boolean',
      default: 'true',
      description: 'Fecha com a tecla Esc.',
    },
    {
      name: 'showClose',
      type: 'boolean',
      default: 'true',
      description: 'Mostra o botao X.',
    },
  ],
  examples: [
    {
      title: 'Confirmacao com acoes no rodape',
      code: `const [open, setOpen] = useState(false);

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
</Modal>`,
    },
    {
      title: 'So conteudo, sem titulo',
      code: `<Modal open={open} onClose={close} size="lg">
  <img src="/foto.jpg" alt="Detalhe" />
</Modal>`,
    },
  ],
  notes: [
    'e controlado: guarde o open no seu estado e feche no onClose.',
    'O clique so fecha no scrim, nunca no conteudo; use footer pros botoes de acao.',
    'Trava o scroll do body e prende o foco (Tab circula dentro) enquanto aberto.',
  ],
};

export default modalManifest;
