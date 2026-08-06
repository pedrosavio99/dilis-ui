import { Avatar } from '@dilis/ui';
import { CodeBlock } from '../components/CodeBlock';
import { Example } from '../components/Example';

export function AvatarView() {
  return (
    <div className="view">
      <header className="view__head">
        <h2 className="view__title">Avatar</h2>
        <p className="view__lead">
          Circular, em 3 tamanhos. Recebe <code>src</code> (caminho ou link) pra
          mostrar a imagem, ou <code>name</code> pra virar 1 ou 2 iniciais. Se a
          imagem falhar, cai nas iniciais sozinho.
        </p>
      </header>

      <div className="view__import">
        <span className="view__import-label">import</span>
        <CodeBlock lang="tsx" code={`import { Avatar } from '@dilis/ui';`} />
      </div>

      <Example
        title="Tamanhos"
        code={`<Avatar name="Ana Souza" size="sm" />
<Avatar name="Ana Souza" size="md" />
<Avatar name="Ana Souza" size="lg" />`}
      >
        <div className="row row--baseline">
          <Avatar name="Ana Souza" size="sm" />
          <Avatar name="Ana Souza" size="md" />
          <Avatar name="Ana Souza" size="lg" />
        </div>
      </Example>

      <Example
        title="Com imagem (link)"
        code={`<Avatar src="https://i.pravatar.cc/150?img=12" name="Ana Souza" size="lg" />`}
      >
        <div className="row row--baseline">
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Ana Souza" size="sm" />
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Ana Souza" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Ana Souza" size="lg" />
        </div>
      </Example>

      <Example
        title="Iniciais (1 ou 2 letras) com cor pelo nome"
        code={`<Avatar name="Pedro Savio" />   // PS
<Avatar name="Danilo" />        // D
<Avatar name="Hiago Truta" />   // HT`}
      >
        <div className="row">
          <Avatar name="Pedro Savio" size="lg" />
          <Avatar name="Danilo" size="lg" />
          <Avatar name="Hiago Truta" size="lg" />
          <Avatar name="Rui Fernando" size="lg" />
          <Avatar name="Henzo Barbosa" size="lg" />
        </div>
      </Example>

      <Example
        title="Fallback (imagem quebrada cai nas iniciais)"
        code={`<Avatar src="/nao-existe.jpg" name="Ana Souza" size="lg" />`}
      >
        <div className="row row--baseline">
          <Avatar src="/nao-existe.jpg" name="Ana Souza" size="lg" />
          <Avatar size="lg" />
        </div>
      </Example>
    </div>
  );
}
