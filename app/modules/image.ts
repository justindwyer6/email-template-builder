import { HtmlModule, ImageModuleProperties } from '../types';
import { flattenValues } from '../utils';

const ImageModuleProperties: ImageModuleProperties = {
  name: 'Image',
  link: {
    value: 'https://www.google.com',
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

const imageModuleTemplate = (
  ImageModuleProperties: ImageModuleProperties,
  devMode: boolean
) => {
  const { alignment, link, imageSrc, width, verticalAlign, altText } =
    flattenValues(ImageModuleProperties);

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
};

export const IMAGE_MODULE: HtmlModule<ImageModuleProperties> = {
  template: imageModuleTemplate,
  data: ImageModuleProperties,
};
