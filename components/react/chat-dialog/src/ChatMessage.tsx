import React, { HTMLAttributes, ReactNode, useId } from 'react';
import clsx from 'clsx';
import { Paragraph, ParagraphProps } from '@nl-design-system-candidate/paragraph-react';
import '@nl-design-system-candidate/paragraph-react/css';
import { ChatMessageAttachment, ChatMessageAttachmentProps } from './ChatMessageAttachment';
import './styles/index.scss';

/** resident = the resident (aligned right), organization = municipality or other organization (aligned left) */
export type ChatMessageVariant = 'resident' | 'organization';

// Text props have Dutch defaults; override them for other languages.
export type ChatMessageProps = HTMLAttributes<HTMLElement> & {
  variant: ChatMessageVariant;
  /** Sender name, e.g. "Jij" or "Gemeente Voorbeeld" */
  author: ReactNode;
  /** Screen reader text before the author. Default "Bericht van". */
  authorPrefix?: string;
  /** Machine-readable date and time for <time datetime>, e.g. "2026-07-14T10:30" */
  dateTime: string;
  /** Visible date and time, e.g. "14-07-2026 - 10:30" */
  time: ReactNode;
  /** Screen reader text before the time. Default "Verzonden op" (resident) or "Ontvangen op" (organization). */
  timePrefix?: string;
  /** Status text for screen readers, e.g. "Status: verzonden" */
  status?: string;
  /** Attachments below the message text */
  attachments?: ChatMessageAttachmentProps[];
};

/** A paragraph in a message (NLDS Paragraph) */
export const ChatMessageText = ({ className, ...props }: ParagraphProps) => (
  <Paragraph className={clsx('mijn-chat-message__text', className)} {...props} />
);

export const ChatMessage = ({
  variant,
  author,
  authorPrefix = 'Bericht van',
  dateTime,
  time,
  timePrefix,
  status,
  attachments,
  className,
  children,
  ...props
}: ChatMessageProps) => {
  const id = useId();
  const authorId = `${id}-author`;
  const timeId = `${id}-time`;

  const classNames = clsx(
    'mijn-chat-message',
    {
      'mijn-chat-message--resident': variant === 'resident',
      'mijn-chat-message--organization': variant === 'organization',
    },
    className,
  );

  const defaultTimePrefix = variant === 'resident' ? 'Verzonden op' : 'Ontvangen op';

  return (
    <article className={classNames} aria-labelledby={`${authorId} ${timeId}`} {...props}>
      <header className="mijn-chat-message__author" id={authorId}>
        <span className="mijn-visually-hidden">{authorPrefix} </span>
        {author}
      </header>

      <div className="mijn-chat-message__body">
        {/* Plain string children become a paragraph */}
        {typeof children === 'string' ? <ChatMessageText>{children}</ChatMessageText> : children}

        {attachments?.map((attachment, index) => (
          <ChatMessageAttachment
            key={attachment.href ?? `${attachment.fileName}-${index}`}
            {...attachment}
            className={clsx('mijn-chat-message__attachment', attachment.className)}
          />
        ))}
      </div>

      <footer className="mijn-chat-message__footer">
        <span className="mijn-visually-hidden">{timePrefix ?? defaultTimePrefix} </span>
        <time className="mijn-chat-message__time" id={timeId} dateTime={dateTime}>
          {time}
        </time>
        {/* Status as text, not only by color or position */}
        {status && <span className="mijn-chat-message__status mijn-visually-hidden">{status}</span>}
      </footer>
    </article>
  );
};

export default ChatMessage;
