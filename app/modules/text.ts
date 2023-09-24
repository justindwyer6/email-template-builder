import { HtmlModule, TextModuleProperties } from '../types';
import { flattenValues } from '../utils';

export class TextModule implements HtmlModule<TextModuleProperties> {
  private static defaultProperties: TextModuleProperties = {
    name: 'Text',
    link: {
      value: '',
      label: 'Link',
      details: '',
      documentationUrl: '',
    },
    textContent: {
      value: '',
      label: 'Text',
      details: '',
      documentationUrl: '',
    },
    textColor: {
      value: '',
      label: 'Text Color',
      details: '',
      documentationUrl: '',
    },
    fontShorthand: {
      value: '',
      label: 'Font',
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

  public data: TextModuleProperties;

  constructor(data?: Partial<TextModuleProperties>) {
    this.data = { ...TextModule.defaultProperties, ...data };
  }

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
      verticalAlign,
    } = flattenValues(textModuleProperties);

    return `
<tr>
  <td style="padding: 48px 64px 32px;">
    <a
      style="text-decoration: none; color: ${textColor};"
      href="${link}"
    >
      <p style="font: ${fontShorthand}; text-align: ${alignment}; margin: 0;">
        ${textContent}
      </p>
    </a>
  </td>
</tr>
    `;
  }
}
