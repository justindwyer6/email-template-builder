import { AnyModuleProperties } from './types';

export const flattenValues = (
  moduleData: AnyModuleProperties
): Record<keyof AnyModuleProperties, string> => {
  return Object.entries(moduleData).reduce(
    (acc, [key, data]) => {
      acc[key as keyof AnyModuleProperties] = data.value;
      return acc;
    },
    {} as Record<keyof AnyModuleProperties, string>
  );
};
