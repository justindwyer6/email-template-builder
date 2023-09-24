import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { modules } from '../modules';
import { HtmlModule } from '../types';

interface ModuleSelectProps {
  handleChange: (module: HtmlModule) => void;
}

const ModuleSelect: React.FC<ModuleSelectProps> = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (event: SelectChangeEvent<string>) => {
    handleChange(modules[event.target.value]);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="dropdown-label">Add a module</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedOption}
        onChange={handleSelect}
        label="Add a module"
      >
        <MenuItem value="" disabled>
          Add a module
        </MenuItem>

        {Object.keys(modules).map((key) => (
          <MenuItem key={modules[key].data.name} value={key}>
            {modules[key].data.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ModuleSelect;
