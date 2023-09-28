import React, { useState, useRef, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { AnyModuleProperties } from '../types';

type ModuleInputProps = {
  propertyKey: keyof AnyModuleProperties;
  value: string;
  label: string;
  updateProperty: (property: keyof AnyModuleProperties, value: string) => void;
};

const ModuleInput: React.FC<ModuleInputProps> = ({
  propertyKey,
  value,
  label,
  updateProperty,
}) => {
  const [propertyValue, setPropertyValue] = useState<string>(value);
  const [isExpanded, setIsExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleBlur = () => {
    setIsExpanded(false);
  };

  // const handleKeyDown = (e: any) => {
  //   if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown') {
  //     setIsExpanded(true);
  //   }
  //   if (e.key === 'ArrowDown') {
  //     setIsExpanded(true);
  //   }
  //   // Check for Escape key
  //   if (e.key === 'Escape') {
  //     if (isExpanded && textareaRef.current) {
  //       textareaRef.current.blur();
  //     } else if (!isExpanded && inputRef.current) {
  //       inputRef.current.blur();
  //     }
  //   }
  // };

  const handleChange = (value: string) => {
    updateProperty(propertyKey, value);
    setPropertyValue(value);
  };

  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row' }}>
      <TextField
        label={label}
        type="text"
        variant="outlined"
        size="small"
        fullWidth
        value={propertyValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        inputRef={inputRef}
        // onKeyDown={handleKeyDown}
      />

      {/* TODO: Abstract the onClick */}
      <Button
        onClick={async () => {
          const value = await navigator.clipboard.readText();
          console.dir(value);
          handleChange(value);
        }}
      >
        Paste
      </Button>
    </Box>
  );
};

export default ModuleInput;
