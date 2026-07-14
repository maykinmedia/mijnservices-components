import './styles/index.scss';
import React, { AnchorHTMLAttributes, ComponentType } from 'react';
import Base from './CaseCardBase';
import Wrapper from './CaseCardWrapper';
import Background from './CaseCardBackground';
import Context from './CaseCardContext';
import Footer from './CaseCardFooter';
import Action from './CaseCardAction';

export type CaseCardAppearance = 'default' | 'archived' | 'list';

/** Alleen echte heading-niveaus toestaan, nooit h1 (die hoort bij de pagina zelf) */
export type CaseCardHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface CaseCardProps {
  /** Klein tekstregeltje boven de titel, bijv. een status-label */
  eyebrow?: string;
  title: string;
  subTitle?: string;
  /**
   * Zonder deze prop wordt de titel als paragraaf getoond (zoals voorheen).
   * Zet deze prop als de titel ook echt een kopje in de pagina-structuur moet zijn,
   * bijvoorbeeld headingLevel={2} voor een <h2>.
   */
  headingLevel?: CaseCardHeadingLevel;
  context?: React.ReactNode;
  href?: string;
  appearance?: CaseCardAppearance;
  /** Voor projecten die hun eigen Link-component (bijv. react-router) willen injecteren */
  Link?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export const CaseCard = ({
  eyebrow,
  title,
  subTitle,
  headingLevel,
  context,
  href,
  appearance = 'default',
  Link,
}: CaseCardProps) => {
  const TitleTag = headingLevel ? (`h${headingLevel}` as const) : 'p';

  return (
    <Base appearance={appearance}>
      <Wrapper>
        <Background />
        <div>
          {eyebrow && <p className="mijnservices-case-card__eyebrow">{eyebrow}</p>}

          <TitleTag className="mijnservices-case-card__title">{title}</TitleTag>

          {subTitle && <p className="mijnservices-case-card__subtitle">{subTitle}</p>}
        </div>

        <Footer>
          <Context>{context}</Context>
          <Action aria-label={title} href={href} Action={Link}>
            <span aria-hidden="true" className="mijnservices-case-card__arrow">
              →
            </span>
          </Action>
        </Footer>
      </Wrapper>
    </Base>
  );
};

export default CaseCard;
