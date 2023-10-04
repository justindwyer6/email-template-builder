import {
  ImageModuleProperties,
  HtmlModule,
  ImageModuleMetadata,
} from '../types';

export class ImageModule implements HtmlModule<ImageModuleProperties> {
  private static initialProperties: ImageModuleProperties = {
    link: '',
    imageSrc: 'https://picsum.photos/640/400',
    altText: '',
    alignment: 'center',
    verticalAlignment: 'top',
    width: '640',
  };

  public metadata: ImageModuleMetadata = {
    link: {
      label: 'Link',
      details: '',
      documentationUrl: '',
      type: 'content',
    },
    imageSrc: {
      label: 'Image Source Link',
      details: '',
      documentationUrl: '',
      type: 'content',
    },
    altText: {
      label: 'Alt Text',
      details: '',
      documentationUrl: '',
      type: 'content',
    },
    alignment: {
      label: 'Alignment',
      details: '',
      documentationUrl: '',
      type: 'style',
    },
    verticalAlignment: {
      label: 'Vertical Alignment',
      details: '',
      documentationUrl: '',
      type: 'style',
    },
    width: {
      label: 'Width',
      details: '',
      documentationUrl: '',
      type: 'style',
    },
  };

  public data: ImageModuleProperties;

  constructor(data?: Partial<ImageModuleProperties>) {
    this.data = { ...ImageModule.initialProperties, ...data };
  }

  public name: string = 'Image';

  template(
    imageModuleProperties: ImageModuleProperties,
    devMode: boolean
  ): string {
    const { alignment, link, imageSrc, width, verticalAlignment, altText } =
      imageModuleProperties;

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
        style="vertical-align: ${verticalAlignment}; max-width: ${width}px; width: 100%;"
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
