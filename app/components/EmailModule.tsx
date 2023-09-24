'use client';
import React, { useState } from 'react';
import { HtmlModule, isPropertyData } from '../types';
import { cloneDeep } from 'lodash';
import ModuleInput from './ModuleInput';
import { AnyModuleProperties } from '../types';

// TODO: Build a toggle for this
const devMode = true;

type EmailModuleProps = {
  module: HtmlModule<AnyModuleProperties>;
};

const EmailModule: React.FC<EmailModuleProps> = ({
  module: { template, data },
}) => {
  const [moduleData, setModuleData] = useState<AnyModuleProperties>(data);

  const updateProperty = (
    propertyKey: keyof AnyModuleProperties,
    value: string
  ) => {
    const newModuleData = cloneDeep(moduleData);
    const newProperty = newModuleData[propertyKey];

    if (typeof newProperty === 'string') return;

    newProperty.value = value;
    setModuleData(newModuleData);
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
        <h2>{moduleData.name}</h2>
        <div>
          {Object.keys(moduleData).map((key, i) => {
            const typedKey = key as keyof AnyModuleProperties;
            const property = moduleData[typedKey];

            if (typeof property === 'string') return;

            if (!isPropertyData(property)) return;

            return (
              <ModuleInput
                key={i}
                propertyKey={typedKey}
                value={property.value}
                label={property.label}
                updateProperty={updateProperty}
              />
            );
          })}
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
