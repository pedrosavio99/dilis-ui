import type { HTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** URL ou caminho da imagem. Se faltar ou falhar ao carregar, cai nas iniciais. */
  src?: string;
  /** Texto de onde saem as iniciais (1 ou 2 letras) e o rotulo acessivel. */
  name?: string;
  /** Alt da imagem. Padrao: name. */
  alt?: string;
  /** Tamanho. Padrao: md. */
  size?: AvatarSize;
  /** Cor de fundo custom. Sobrescreve a cor automatica derivada do nome. */
  bgColor?: string;
  /** Cor do texto (iniciais) e do icone de fallback. */
  textColor?: string;
  /** Classe extra. Entra por ultimo, sobrescreve o estilo base. */
  className?: string;
}
