/**
 * Dilis UI
 * Entry point da biblioteca.
 *
 * Os imports de CSS abaixo garantem que as variaveis de token e o
 * reset base entrem no bundle de estilo gerado no build (dilis-ui.css).
 * O projeto que consome a lib importa esse CSS uma unica vez.
 */
import './tokens/tokens.css';
import './styles/base.css';
import './icons/icons.css';

// tokens (valores em runtime + tipos)
export * from './tokens';

// utilitarios
export * from './utils';

// componentes
export * from './components';

// icones e marca
export * from './icons';
// meta: gerador do guia de uso para agentes (buildAgentDoc + tipos de manifesto)
export * from './meta';
