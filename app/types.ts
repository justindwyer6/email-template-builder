type Alignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'middle' | 'bottom';

export interface PropertyData<T = string> {
  value: T;
  label: string;
  details: string;
  documentationUrl: string;
}

export function isPropertyData<T>(obj: any): obj is PropertyData<T> {
  return (
    obj &&
    typeof obj.value !== 'undefined' &&
    typeof obj.label === 'string' &&
    typeof obj.details === 'string' &&
    typeof obj.documentationUrl === 'string'
  );
}

export interface HtmlModuleProperties {
  name: string;
  alignment: PropertyData<Alignment>;
  link: PropertyData<string>;
  width: PropertyData<string>;
  verticalAlign: PropertyData<VerticalAlignment>;
}

export interface ImageModuleProperties extends HtmlModuleProperties {
  imageSrc: PropertyData<string>;
  altText: PropertyData<string>;
}

export interface TextModuleProperties extends HtmlModuleProperties {
  textContent: PropertyData<string>;
  textColor: PropertyData<string>;
  fontShorthand: PropertyData<string>;
}

export type AnyModuleProperties = HtmlModuleProperties &
  Partial<
    Omit<ImageModuleProperties, keyof HtmlModuleProperties> &
      Omit<TextModuleProperties, keyof HtmlModuleProperties>
  >;

export interface HtmlModule<T = AnyModuleProperties> {
  template: (HtmlModuleProperties: T, devMode: boolean) => string;
  data: T;
}

export interface ModulesDictionary {
  [key: string]: HtmlModule<any> & { data: HtmlModuleProperties };
}

//   aStyle: string;
//   tdStyle: string;
