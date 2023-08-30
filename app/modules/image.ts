import { HtmlModule, ImageModuleProperties } from '../types';
import { flattenValues } from '../utils';

export class ImageModule implements HtmlModule<ImageModuleProperties> {
  private static defaultProperties: ImageModuleProperties = {
    name: 'Image',
    link: {
      value: '',
      label: 'Link',
      details: '',
      documentationUrl: '',
    },
    imageSrc: {
      value: 'https://picsum.photos/640/400',
      label: 'Image Source Link',
      details: '',
      documentationUrl: '',
    },
    altText: {
      value: '',
      label: 'Alt Text',
      details: '',
      documentationUrl: '',
    },
    alignment: {
      value: 'center',
      label: 'Alignment',
      details: '',
      documentationUrl: '',
    },
    verticalAlign: {
      value: 'top',
      label: 'Vertical Alignment',
      details: '',
      documentationUrl: '',
    },
    width: {
      value: '640',
      label: 'Width',
      details: '',
      documentationUrl: '',
    },
  };

  public data: ImageModuleProperties;

  constructor(data?: Partial<ImageModuleProperties>) {
    this.data = { ...ImageModule.defaultProperties, ...data };
  }

  template(
    imageModuleProperties: ImageModuleProperties,
    devMode: boolean
  ): string {
    const { alignment, link, imageSrc, width, verticalAlign, altText } =
      flattenValues(imageModuleProperties);

    return `
    <tr>
        <td align="${alignment}">
            <a
                style="text-decoration: none;"
                href="${link}"
            >
                <img
                    src="${imageSrc}"
                    width="${width}"
                    style="vertical-align: ${verticalAlign}; max-width: ${width}px; width: 100%;"
                    alt="${altText}"
                />${
                  devMode
                    ? altText
                      ? `<p>${altText}</p>`
                      : `<p style="color: red">Error: Missing alt text</p>`
                    : ''
                }
            </a>
        </td>
    </tr>
    `;
  }
}
