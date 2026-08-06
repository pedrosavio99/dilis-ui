import { useMemo, useState } from 'react';
import { Mural } from './mural/Mural';
import { registry } from './mural/registry';
import { UsageGuide } from './components/UsageGuide';

export function App() {
  const [active, setActive] = useState(registry[0].id);

  const ActiveView = useMemo(() => {
    const entry = registry.find((item) => item.id === active) ?? registry[0];
    return entry.view;
  }, [active]);

  return (
    <>
      <div className="app">
        <Mural active={active} onSelect={setActive} />
        <main className="content">
          <ActiveView />
        </main>
      </div>
      <UsageGuide />
    </>
  );
}