import './styles/index.scss';
import React, { AnchorHTMLAttributes, ComponentType } from 'react';
import Base from './CardAsLinkBase';
import Wrapper from './CardAsLinkWrapper';
import Background from './CardAsLinkBackground';
import Context from './CardAsLinkContext';
import Footer from './CardAsLinkFooter';
import Action from './CardAsLinkAction';

export type CardAsLinkAppearance = 'default' | 'archived' | 'list';

/** Alleen echte heading-niveaus toestaan, nooit h1 (die hoort bij de pagina zelf) */
export type CardAsLinkHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface CardAsLinkProps {
  /** Klein tekstregeltje boven de titel, bijv. een status-label */
  eyebrow?: string;
  title: string;
  subTitle?: string;
  /**
   * Zonder deze prop wordt de titel als paragraaf getoond (zoals voorheen).
   * Zet deze prop als de titel ook echt een kopje in de pagina-structuur moet zijn,
   * bijvoorbeeld headingLevel={2} voor een <h2>.
   */
  headingLevel?: CardAsLinkHeadingLevel;
  context?: React.ReactNode;
  href?: string;
  appearance?: CardAsLinkAppearance;
  /** Voor projecten die hun eigen Link-component (bijv. react-router) willen injecteren */
  Link?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export const CardAsLink = ({
  eyebrow,
  title,
  subTitle,
  headingLevel,
  context,
  href,
  appearance = 'default',
  Link,
}: CardAsLinkProps) => {
  const TitleTag = headingLevel ? (`h${headingLevel}` as const) : 'p';

  return (
    <Base appearance={appearance}>
      <Wrapper>
        <Background />
        <div>
          {eyebrow && <p className="mijnservices-card-as-link__eyebrow">{eyebrow}</p>}

          <TitleTag className="mijnservices-card-as-link__title">{title}</TitleTag>

          {subTitle && <p className="mijnservices-card-as-link__subtitle">{subTitle}</p>}
        </div>

        <Footer>
          <Context>{context}</Context>
          <Action aria-label={title} href={href} Action={Link}>
            <span aria-hidden="true" className="mijnservices-card-as-link__arrow">
              →
            </span>
          </Action>
        </Footer>
      </Wrapper>
    </Base>
  );
};

export default CardAsLink;
