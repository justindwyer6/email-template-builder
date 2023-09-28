'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EmailModule from './components/EmailModule';
import ModuleSelect from './components/ModuleSelect';
import { HtmlModule } from './types';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

const App: React.FC = () => {
  const [activeModules, setActiveModules] = useState<HtmlModule[]>([]);

  const handleSetActiveModules = (newModule: HtmlModule) => {
    setActiveModules([...activeModules, newModule]);
  };

  console.dir(activeModules);

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <ModuleSelect handleChange={handleSetActiveModules} />
        </Toolbar>
      </AppBar>
      <Box mt={14}>
        {/* TODO: Abstract onClick and Add feedback; Use the state that's already in the children */}
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              activeModules.reduce((acc: string, module: HtmlModule) => {
                return `${acc}${module.template(module.data, false)}`;
              }, '')
            );
          }}
        >
          Copy Full HTML
        </Button>

        {activeModules.map((module: HtmlModule, i: number) => {
          return <EmailModule key={i} module={module} />;
        })}
      </Box>
    </div>
  );
};

export default App;
