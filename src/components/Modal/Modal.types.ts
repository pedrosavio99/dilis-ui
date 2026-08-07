import type { HTMLAttributes, ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Controla a visibilidade. */
  open: boolean;
  /** Chamado ao pedir pra fechar (X, scrim ou Esc). */
  onClose: () => void;
  /** Titulo do modal (vira o aria-labelledby). */
  title?: ReactNode;
  /** Subtitulo curto abaixo do titulo. */
  description?: ReactNode;
  /** Area de acoes no rodape (ex: botoes). */
  footer?: ReactNode;
  /** Largura maxima. Padrao: md. */
  size?: ModalSize;
  /** Fecha ao clicar no scrim (fora do painel). Padrao: true. */
  closeOnScrim?: boolean;
  /** Fecha com a tecla Esc. Padrao: true. */
  closeOnEsc?: boolean;
  /** Mostra o botao X no canto. Padrao: true. */
  showClose?: boolean;
  /** Conteudo do corpo. */
  children?: ReactNode;
  /** Classe extra no painel. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
