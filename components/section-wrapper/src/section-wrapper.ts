import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './index.scss?inline';

export type SectionWrapperHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

let instanceCount = 0;

@customElement('mijnservices-section-wrapper')
export class MijnservicesSectionWrapper extends LitElement {
  static styles = unsafeCSS(styles);

  /** The heading text. Required — this is the only mandatory content. */
  @property() heading = '';

  /** Heading level, renders <h1>–<h6>. Left to the consumer to fit page outline. */
  @property({ attribute: 'heading-level', type: Number }) headingLevel: SectionWrapperHeadingLevel = 2;

  /** Optional label shown above the heading. Also used to derive the hgroup's aria-label. */
  @property() eyebrow = '';

  /** Optional href. When set, the heading text renders as a link. */
  @property() href = '';

  private readonly headingId = `mijnservices-section-wrapper-heading-${++instanceCount}`;

  private renderHeadingContent() {
    return this.href
      ? html`<a class="mijnservices-section-wrapper__link" href="${this.href}">${this.heading}</a>`
      : html`${this.heading}`;
  }

  private renderHeading() {
    const content = this.renderHeadingContent();
    const cls = 'mijnservices-section-wrapper__heading';
    switch (this.headingLevel) {
      case 1:
        return html`<h1 id="${this.headingId}" class="${cls}">${content}</h1>`;
      case 3:
        return html`<h3 id="${this.headingId}" class="${cls}">${content}</h3>`;
      case 4:
        return html`<h4 id="${this.headingId}" class="${cls}">${content}</h4>`;
      case 5:
        return html`<h5 id="${this.headingId}" class="${cls}">${content}</h5>`;
      case 6:
        return html`<h6 id="${this.headingId}" class="${cls}">${content}</h6>`;
      default:
        return html`<h2 id="${this.headingId}" class="${cls}">${content}</h2>`;
    }
  }

  render() {
    return html`
      <section class="mijnservices-section-wrapper" aria-labelledby="${this.headingId}">
        <hgroup class="mijnservices-section-wrapper__hgroup" aria-label="${ifDefined(this.eyebrow || undefined)}">
          ${this.eyebrow ? html`<p class="mijnservices-section-wrapper__eyebrow">${this.eyebrow}</p>` : ''}
          ${this.renderHeading()}
        </hgroup>
        <slot></slot>
      </section>
    `;
  }
}
