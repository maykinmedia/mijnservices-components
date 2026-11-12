import React, { HTMLAttributes, ReactNode, useId } from 'react';
import clsx from 'clsx';
import { Paragraph, ParagraphProps } from '@nl-design-system-candidate/paragraph-react';
import '@nl-design-system-candidate/paragraph-react/css';
import { MessageAttachment, MessageAttachmentProps } from './MessageAttachment';

/** resident = de inwoner zelf (rechts), organization = de gemeente of andere organisatie (links) */
export type MessageVariant = 'resident' | 'organization';

export type MessageProps = HTMLAttributes<HTMLElement> & {
  variant: MessageVariant;
  /** Naam van de afzender, bijv. "Jij" of "Gemeente Voorbeeld" */
  author: ReactNode;
  /** Tekst voor screenreaders vóór de afzender. Standaard "Bericht van". */
  authorPrefix?: string;
  /** Machine-leesbare datum en tijd voor <time datetime>, bijv. "2026-07-14T10:30" */
  dateTime: string;
  /** Leesbare datum en tijd, bijv. "14-07-2026 - 10:30" */
  time: ReactNode;
  /** Tekst voor screenreaders vóór de tijd. Standaard "Verzonden op" (resident) of "Ontvangen op" (organization). */
  timePrefix?: string;
  /** Status als tekst voor screenreaders, bijv. "Status: verzonden" */
  status?: string;
  /** Bijlagen onder de tekst van het bericht */
  attachments?: MessageAttachmentProps[];
};

/** Eén alinea in een bericht (NLDS Paragraph) */
export const MessageText = ({ className, ...props }: ParagraphProps) => (
  <Paragraph className={clsx('mijnservices-message__text', className)} {...props} />
);

export const Message = ({
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
}: MessageProps) => {
  const id = useId();
  const authorId = `${id}-author`;
  const timeId = `${id}-time`;

  const classNames = clsx(
    'mijnservices-message',
    {
      'mijnservices-message--resident': variant === 'resident',
      'mijnservices-message--organization': variant === 'organization',
    },
    className,
  );

  const defaultTimePrefix = variant === 'resident' ? 'Verzonden op' : 'Ontvangen op';

  return (
    <article className={classNames} aria-labelledby={`${authorId} ${timeId}`} {...props}>
      <header className="mijnservices-message__author" id={authorId}>
        <span className="mijnservices-messages__visually-hidden">{authorPrefix} </span>
        {author}
      </header>

      <div className="mijnservices-message__body">
        {/* Losse tekst wordt automatisch een alinea */}
        {typeof children === 'string' ? <MessageText>{children}</MessageText> : children}

        {attachments?.map((attachment, index) => (
          <MessageAttachment
            key={attachment.href ?? `${attachment.fileName}-${index}`}
            {...attachment}
            className={clsx('mijnservices-message__attachment', attachment.className)}
          />
        ))}
      </div>

      <footer className="mijnservices-message__footer">
        <span className="mijnservices-messages__visually-hidden">{timePrefix ?? defaultTimePrefix} </span>
        <time className="mijnservices-message__time" id={timeId} dateTime={dateTime}>
          {time}
        </time>
        {/* Status als tekst, niet alleen via kleur of positie */}
        {status && (
          <span className="mijnservices-message__status mijnservices-messages__visually-hidden">{status}</span>
        )}
      </footer>
    </article>
  );
};

export default Message;
