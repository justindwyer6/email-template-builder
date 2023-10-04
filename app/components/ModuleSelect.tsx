import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { modules } from '../modules';
import { HtmlModule } from '../types';

interface ModuleSelectProps {
  handleSelect: (module: HtmlModule) => void;
}

const ModuleSelect: React.FC<ModuleSelectProps> = ({ handleSelect }) => {
  const [selectedOption, _] = useState<string>('');

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="dropdown-label">Add a module</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedOption}
        onChange={(e) => handleSelect(modules[e.target.value])}
        label="Add a module"
      >
        <MenuItem value="" disabled>
          Add a module
        </MenuItem>

        {Object.keys(modules).map((key) => (
          <MenuItem key={modules[key].name} value={key}>
            {modules[key].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModuleSelect;
