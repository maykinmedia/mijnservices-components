import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './index.scss?inline';

export type PlanCardAppearance = 'default' | 'plain';

@customElement('mijnservices-plan-card')
export class MijnservicesPlanCard extends LitElement {
  static styles = unsafeCSS(styles);

  @property() heading = '';
  @property() domain = '';
  @property() href = '';
  @property() date = '';
  @property({ attribute: 'date-time' }) dateTime = '';
  @property() appearance: PlanCardAppearance = 'default';

  render() {
    return html`
      <div class="mijnservices-plan-card ${this.appearance === 'plain' ? 'mijnservices-plan-card--plain' : ''}">
        <div class="mijnservices-plan-card__clip"></div>
        <div class="mijnservices-plan-card__background"></div>
        <div class="mijnservices-plan-card__inner">
          <div>
            <p class="mijnservices-plan-card__domain">${this.domain}</p>
            <p class="mijnservices-plan-card__heading">${this.heading}</p>
          </div>
          <slot></slot>
          <div class="mijnservices-plan-card__footer">
            ${this.date
              ? html`<time class="mijnservices-plan-card__date" datetime="${this.dateTime}">${this.date}</time>`
              : html`<span></span>`}
            <a class="mijnservices-plan-card__action" href="${this.href}" aria-label="${this.heading}">
              <svg
                class="mijnservices-plan-card__arrow"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                focusable="false"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L16.586 13H5a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
