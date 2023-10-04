type Alignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'middle' | 'bottom';
export type inputType = 'content' | 'style' | 'rawHtml';

export interface PropertyMetadata {
  label: string;
  details: string;
  documentationUrl: string;
  type: inputType;
}

export function isPropertyMetadata<T>(obj: any): obj is PropertyMetadata {
  return (
    obj &&
    typeof obj.value !== 'undefined' &&
    typeof obj.label === 'string' &&
    typeof obj.details === 'string' &&
    typeof obj.documentationUrl === 'string'
  );
}

export interface GenericModuleProperties {
  alignment: Alignment;
  link: string;
  width: string;
  verticalAlignment: VerticalAlignment;
}

export type GenericModuleMetadata = {
  [K in keyof GenericModuleProperties]: PropertyMetadata;
};

export interface ImageModuleProperties extends GenericModuleProperties {
  imageSrc: string;
  altText: string;
}

export type ImageModuleMetadata = {
  [K in keyof ImageModuleProperties]: PropertyMetadata;
};

export interface TextModuleProperties extends GenericModuleProperties {
  textContent: string;
  textColor: string;
  fontShorthand: string;
}

export type TextModuleMetadata = {
  [K in keyof TextModuleProperties]: PropertyMetadata;
};

export type AnyModuleProperties = GenericModuleProperties &
  Partial<
    Omit<ImageModuleProperties, keyof GenericModuleProperties> &
      Omit<TextModuleProperties, keyof GenericModuleProperties>
  >;

export interface HtmlModule<T = AnyModuleProperties> {
  template: (GenericModuleProperties: T, devMode: boolean) => string;
  data: T;
  metadata: Record<string, PropertyMetadata>;
  name: string;
}

export interface ModulesDictionary {
  [key: string]: HtmlModule<any> & { data: GenericModuleProperties };
}
