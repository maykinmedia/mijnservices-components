import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import './styles/index.scss';

// Text props have Dutch defaults; override them for other languages.
export type ChatMessageAttachmentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** File name, e.g. "wasmachine.png" */
  fileName: string;
  /** File type, e.g. "png" */
  fileType?: string;
  /** Readable file size, e.g. "228 kB" */
  fileSize?: string;
  /** Readable date, e.g. "14-07-2026" */
  fileDate?: string;
  /** Thumbnail source. Without it (e.g. a PDF) an empty placeholder is shown. */
  thumbnailSrc?: string;
  /** File URL. With href: <a> (sent message). Without: <div> (selected file, not yet sent). */
  href?: string;
  /** Screen reader text before the file name, e.g. "Bijlage" or "Gekozen bijlage" */
  label?: string;
};

export const ChatMessageAttachment = ({
  fileName,
  fileType,
  fileSize,
  fileDate,
  thumbnailSrc,
  href,
  label = 'Bijlage',
  className,
  ...props
}: ChatMessageAttachmentProps) => {
  const classNames = clsx('mijn-chat-message-attachment', className);

  // Only available details, comma-separated: (png, 228 kB, 14-07-2026)
  const details = [
    fileType && { key: 'type', value: fileType },
    fileSize && { key: 'size', value: fileSize },
    fileDate && { key: 'date', value: fileDate },
  ].filter(Boolean) as { key: string; value: string }[];

  const content = (
    <>
      {/* Always rendered; empty without thumbnail (placeholder via SCSS) */}
      <span className="mijn-chat-message-attachment__image">{thumbnailSrc && <img src={thumbnailSrc} alt="" />}</span>
      <span className="mijn-chat-message-attachment__file-data">
        <span className="mijn-visually-hidden">{label}: </span>
        <span className="mijn-chat-message-attachment__file-name">{fileName}</span>
        {details.length > 0 && (
          <>
            {' ('}
            {details.map((detail, index) => (
              <React.Fragment key={detail.key}>
                {index > 0 && ', '}
                <span className={`mijn-chat-message-attachment__file-${detail.key}`}>{detail.value}</span>
              </React.Fragment>
            ))}
            {')'}
          </>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a className={classNames} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <div className={classNames} {...props}>
      {content}
    </div>
  );
};

export default ChatMessageAttachment;
