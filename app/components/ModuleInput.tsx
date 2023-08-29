import React, { useState, useRef, useEffect } from 'react';
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

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    } else if (!isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const handleKeyDown = (e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.keyCode === 39) {
      setIsExpanded(true);
    }
    if (e.keyCode === 35) {
      setIsExpanded(true);
    }
    // Check for Escape key
    if (e.keyCode === 27) {
      if (isExpanded && textareaRef.current) {
        textareaRef.current.blur();
      } else if (!isExpanded && inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleChange = (value: string) => {
    updateProperty(propertyKey, value);
    setPropertyValue(value);
  };

  return (
    <div
      className={`flex flex-col justify-center mr-5 mb-5 ${
        isExpanded
          ? 'fixed inset-0 z-10 bg-opacity-50 bg-black w-100vw'
          : 'w-[200px]'
      } transition-all duration-300`}
    >
      <label className="text-sm mb-1">{label}</label>
      {isExpanded ? (
        <textarea
          ref={textareaRef}
          className="w-1/2 h-1/2"
          value={propertyValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <input
          ref={inputRef}
          type="text"
          className=""
          value={propertyValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default ModuleInput;
