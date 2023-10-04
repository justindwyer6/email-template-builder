'use client';
import React, { useContext, useState } from 'react';
import { HtmlModule, PropertyMetadata } from '../types';
import ModuleInput from './ModuleInput';
import { AnyModuleProperties } from '../types';
import { Button } from '@mui/material';
import { displayedInputTypesContext } from '../page';
import { ImageModule } from '../modules/image';

// TODO: Build a toggle for this
const devMode = true;

type EmailModuleProps = {
  module: HtmlModule<AnyModuleProperties>;
  addNewModule: (newModule: HtmlModule) => void;
};

const EmailModule: React.FC<EmailModuleProps> = ({
  module: { template, data, metadata, name },
  addNewModule,
}) => {
  const [moduleData, setModuleData] = useState<AnyModuleProperties>(data);
  const displayedInputTypes = useContext(displayedInputTypesContext);
  console.log(moduleData);
  const updateProperty = (
    propertyKey: keyof AnyModuleProperties,
    value: string
  ) => {
    setModuleData({ ...moduleData, [propertyKey]: value });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50vw',
          overflow: 'scroll',
        }}
      >
        <h2>{name}</h2>
        <div>
          {Object.keys(moduleData).map((key, i) => {
            const typedKey = key as keyof AnyModuleProperties;
            const propertyValue = moduleData[typedKey];
            const propertyMetadata: PropertyMetadata = metadata[typedKey];

            if (!displayedInputTypes[propertyMetadata.type]) return;

            return (
              <ModuleInput
                key={i}
                propertyKey={typedKey}
                value={propertyValue || ''}
                label={propertyMetadata.label}
                updateProperty={updateProperty}
              />
            );
          })}

          {/* TODO: Abstract onClick and Add feedback */}
          <Button
            onClick={() =>
              navigator.clipboard.writeText(template(moduleData, false))
            }
          >
            Copy Module HTML
          </Button>
          <Button
            onClick={() => {
              addNewModule({ template, data: moduleData, metadata, name });
            }}
          >
            Clone Module
          </Button>
        </div>
        <pre>{template(moduleData, false)}</pre>
      </div>
      <div>
        <div
          style={{
            // transform: 'scale(0.6)',
            transformOrigin: 'top left',
          }}
          dangerouslySetInnerHTML={{
            __html: `
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center"
              style="max-width: 640px; width: 640px; margin: 0 auto; background: #1E1E1E; color: #FFFEF2;"
            >
              ${template(moduleData, devMode)}
            </table>`,
          }}
        />
      </div>
    </div>
  );
};

export default EmailModule;
