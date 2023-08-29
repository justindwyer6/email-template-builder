import React, { useState, ChangeEvent } from 'react';
import { modules } from '../modules';
import { HtmlModule } from '../types';

interface ModuleSelectProps {
  handleChange: (module: HtmlModule) => void;
}

const ModuleSelect: React.FC<ModuleSelectProps> = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    handleChange(modules[event.target.value]);
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleSelect}>
        <option value="" disabled>
          Add a module
        </option>

        {Object.keys(modules).map((key) => (
          <option key={modules[key].data.name} value={key}>
            {modules[key].data.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModuleSelect;
