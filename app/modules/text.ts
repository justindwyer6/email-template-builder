import { HtmlModule, TextModuleMetadata, TextModuleProperties } from '../types';

export class TextModule implements HtmlModule<TextModuleProperties> {
  private static initialProperties: TextModuleProperties = {
    link: '',
    textContent: '',
    textColor: '',
    fontShorthand: '',
    alignment: 'center',
    verticalAlignment: 'top',
    width: '640',
  };

  public metadata: TextModuleMetadata = {
    link: {
      label: 'Link',
      details: '',
      documentationUrl: '',
      type: 'content',
    },
    textContent: {
      label: 'Text',
      details: '',
      documentationUrl: '',
      type: 'content',
    },
    textColor: {
      label: 'Text Color',
      details: '',
      documentationUrl: '',
      type: 'style',
    },
    fontShorthand: {
      label: 'Font',
      details: '',
      documentationUrl: '',
      type: 'style',
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

  public data: TextModuleProperties;

  constructor(data?: Partial<TextModuleProperties>) {
    this.data = { ...TextModule.initialProperties, ...data };
  }

  public name: string = 'Text';

  template(
    textModuleProperties: TextModuleProperties,
    devMode: boolean
  ): string {
    const {
      alignment,
      link,
      textContent,
      textColor,
      fontShorthand,
      width,
      verticalAlignment,
    } = textModuleProperties;

    return `
<tr>
  <td style="padding: 48px 64px 32px;">${
    link &&
    `
    <a
      style="text-decoration: none; color: ${textColor};"
      href="${link}"
    >`
  }
      <p style="font: ${fontShorthand}; text-align: ${alignment}; margin: 0;">
        ${textContent}
      </p>${
        link &&
        `
    </a>`
      }
  </td>
</tr>
    `;
  }
}
