import React, { createContext, HTMLAttributes, ReactNode, useContext, useId } from 'react';
import clsx from 'clsx';
import { Heading } from '@nl-design-system-candidate/heading-react';
import '@nl-design-system-candidate/heading-react/css';
import { Paragraph } from '@nl-design-system-candidate/paragraph-react';
import '@nl-design-system-candidate/paragraph-react/css';
import './styles/index.scss';

/** Heading levels 2–6; h1 belongs to the page */
export type ChatDialogHeadingLevel = 2 | 3 | 4 | 5 | 6;

// Passes the messages id to ChatMessageForm (aria-controls)
const ChatDialogContext = createContext<{ messagesId?: string }>({});
export const useChatDialogContext = () => useContext(ChatDialogContext);

// Text props have Dutch defaults; override them for other languages.
export type ChatDialogProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Conversation title, e.g. "Status van mijn zaak" */
  title: ReactNode;
  /** Heading level of the title. Default 2. */
  headingLevel?: ChatDialogHeadingLevel;
  /** Line below the title, e.g. "Gesprek gestart op <time>31-08-2026</time>" */
  meta?: ReactNode;
  /** Case number, e.g. "Zaaknummer: 4503-2026" */
  caseNumber?: ReactNode;
  /** Accessible name of the message list. Default "Berichten". */
  messagesLabel?: string;
  /** Announced via role="status", e.g. "Nieuw bericht van Gemeente Voorbeeld". Set only for new messages. */
  announcement?: string;
  /** Form below the messages, usually <ChatMessageForm />. Omit for read-only. */
  form?: ReactNode;
  /** Messages: <ChatDialogItem> containing a <ChatMessage> */
  children?: ReactNode;
};

export const ChatDialog = ({
  title,
  headingLevel = 2,
  meta,
  caseNumber,
  messagesLabel = 'Berichten',
  announcement,
  form,
  className,
  children,
  ...props
}: ChatDialogProps) => {
  const id = useId();
  const titleId = `${id}-title`;
  const messagesId = `${id}-messages`;

  return (
    <ChatDialogContext.Provider value={{ messagesId }}>
      <section className={clsx('mijn-chat-dialog', className)} aria-labelledby={titleId} {...props}>
        <header className="mijn-chat-dialog__header">
          <div className="mijn-chat-dialog__header-main">
            <Heading className="mijn-chat-dialog__title" id={titleId} level={headingLevel}>
              {title}
            </Heading>
            {meta && <Paragraph className="mijn-chat-dialog__meta">{meta}</Paragraph>}
          </div>
          {caseNumber && <Paragraph className="mijn-chat-dialog__case-number">{caseNumber}</Paragraph>}
        </header>

        {/* Focusable so keyboard users can scroll */}
        <div className="mijn-chat-dialog__body" id={messagesId} role="region" aria-label={messagesLabel} tabIndex={0}>
          <ol className="mijn-chat-dialog__list">{children}</ol>
        </div>

        {/* Always in the DOM, so changes are announced */}
        <p className="mijn-chat-dialog__status mijn-visually-hidden" role="status">
          {announcement}
        </p>

        {form && <div className="mijn-chat-dialog__form">{form}</div>}
      </section>
    </ChatDialogContext.Provider>
  );
};

export default ChatDialog;
