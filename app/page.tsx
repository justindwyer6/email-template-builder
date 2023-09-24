'use client';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EmailModule from './components/EmailModule';
import ModuleSelect from './components/ModuleSelect';
import { HtmlModule } from './types';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  const [activeModules, setActiveModules] = useState<HtmlModule[]>([]);

  const handleSetActiveModules = (newModule: HtmlModule) => {
    setActiveModules([...activeModules, newModule]);
  };

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <ModuleSelect handleChange={handleSetActiveModules} />
        </Toolbar>
      </AppBar>
      <Box mt={14}>
        {activeModules.map((module: HtmlModule, i: number) => {
          return <EmailModule key={i} module={module} />;
        })}
      </Box>
    </div>
  );
};

export default App;
