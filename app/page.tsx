'use client';
import React, { createContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import EmailModule from './components/EmailModule';
import ModuleSelect from './components/ModuleSelect';
import { HtmlModule, inputType } from './types';
import Box from '@mui/material/Box';
import { Button, InputLabel, Switch } from '@mui/material';

const defaultDisplayedInputTypes: Record<inputType, boolean> = {
  content: true,
  style: false,
  rawHtml: false,
};

export const displayedInputTypesContext = createContext(
  defaultDisplayedInputTypes
);

const App: React.FC = () => {
  const [activeModules, setActiveModules] = useState<HtmlModule[]>([]);
  const [displayedInputTypes, setDisplayedInputTypes] = useState(
    defaultDisplayedInputTypes
  );
  const displayedInputTypesKeys = Object.keys(
    displayedInputTypes
  ) as inputType[];

  const addNewModule = (newModule: HtmlModule) => {
    setActiveModules([...activeModules, newModule]);
  };

  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <ModuleSelect handleSelect={addNewModule} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '300px',
              alignSelf: 'flex-start',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            {displayedInputTypesKeys.map((key, i) => (
              <Box key={i}>
                <InputLabel>{`${key.charAt(0).toUpperCase()}${key.substring(
                  1
                )}`}</InputLabel>
                <Switch
                  checked={displayedInputTypes[key]}
                  onChange={() =>
                    setDisplayedInputTypes({
                      ...displayedInputTypes,
                      [key]: !displayedInputTypes[key],
                    })
                  }
                />
              </Box>
            ))}
          </Box>
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
        <displayedInputTypesContext.Provider value={displayedInputTypes}>
          {activeModules.map((module: HtmlModule, i: number) => {
            return (
              <EmailModule
                key={i}
                module={module}
                addNewModule={addNewModule}
              />
            );
          })}
        </displayedInputTypesContext.Provider>
      </Box>
    </div>
  );
};

export default App;
