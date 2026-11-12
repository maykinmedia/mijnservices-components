import React, { createContext, HTMLAttributes, ReactNode, useContext, useId } from 'react';
import clsx from 'clsx';
import { Heading } from '@nl-design-system-candidate/heading-react';
import '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react';
import '@nl-design-system-candidate/paragraph-react/css';

/** Alleen echte kopniveaus, nooit h1 (die hoort bij de pagina zelf) */
export type MessagesHeadingLevel = 2 | 3 | 4 | 5 | 6;

// Zodat MessageForm het id van de berichtenlijst kent (voor aria-controls), zonder dat je het zelf hoeft door te geven
const MessagesContext = createContext<{ logId?: string }>({});
export const useMessagesContext = () => useContext(MessagesContext);

export type MessagesProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Titel van het gesprek, bijv. "Status van mijn zaak" */
  title: ReactNode;
  /** Kopniveau van de titel. Standaard 2. */
  headingLevel?: MessagesHeadingLevel;
  /** Regel onder de titel, bijv. "Gesprek gestart op <time>31-08-2026</time>" */
  meta?: ReactNode;
  /** Zaaknummer, bijv. "Zaaknummer: 4503-2026" */
  caseNumber?: ReactNode;
  /** Naam van de berichtenlijst voor screenreaders. Standaard "Berichten". */
  logLabel?: string;
  /** Het formulier onder de berichten, meestal <MessageForm />. Laat weg voor een gesprek dat je alleen kunt lezen. */
  form?: ReactNode;
  /** De berichten: <MessagesItem> met daarin een <Message> */
  children?: ReactNode;
};

export const Messages = ({
  title,
  headingLevel = 2,
  meta,
  caseNumber,
  logLabel = 'Berichten',
  form,
  className,
  children,
  ...props
}: MessagesProps) => {
  const id = useId();
  const titleId = `${id}-title`;
  const logId = `${id}-log`;

  return (
    <MessagesContext.Provider value={{ logId }}>
      <section className={clsx('mijnservices-messages', className)} aria-labelledby={titleId} {...props}>
        <header className="mijnservices-messages__header">
          <div className="mijnservices-messages__header-main">
            <Heading className="mijnservices-messages__title" id={titleId} level={headingLevel}>
              {title}
            </Heading>
            {meta && <Paragraph className="mijnservices-messages__meta">{meta}</Paragraph>}
          </div>
          {caseNumber && <Paragraph className="mijnservices-messages__case-number">{caseNumber}</Paragraph>}
        </header>

        {/* Chatgeschiedenis: role="log" is impliciet aria-live="polite" */}
        <div className="mijnservices-messages__body" id={logId} role="log" aria-label={logLabel} tabIndex={0}>
          <ol className="mijnservices-messages__list">{children}</ol>
        </div>

        {form && <div className="mijnservices-messages__form">{form}</div>}
      </section>
    </MessagesContext.Provider>
  );
};

export default Messages;
