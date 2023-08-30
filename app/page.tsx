'use client';
import React, { useState } from 'react';
import EmailModule from './components/EmailModule';
import ModuleSelect from './components/ModuleSelect';
import { HtmlModule } from './types';

const App: React.FC = () => {
  const [activeModules, setActiveModules] = useState<HtmlModule[]>([]);

  const handleSetActiveModules = (newModule: HtmlModule) => {
    setActiveModules([...activeModules, newModule]);
  };

  return (
    // <div className="h-full">
    <div className="relative h-screen overflow-y-scroll">
      <div className="sticky top-0 z-10 w-full bg-indigo-500">
        <ModuleSelect handleChange={handleSetActiveModules} />
      </div>
      {activeModules.map((module: HtmlModule, i: number) => {
        return <EmailModule key={i} module={module} />;
      })}
    </div>
    // </div>
  );
};

export default App;
