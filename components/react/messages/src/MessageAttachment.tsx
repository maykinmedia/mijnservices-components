import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import './styles/index.scss';

// NOTE: text props such as `label` currently have Dutch default values and are not translated yet.
// Projects in another language must pass their own texts via these props.
export type MessageAttachmentProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /** Bestandsnaam, bijv. "wasmachine.png" */
  fileName: string;
  /** Bestandstype, bijv. "png" */
  fileType?: string;
  /** Leesbare bestandsgrootte, bijv. "228 kB" */
  fileSize?: string;
  /** Leesbare datum, bijv. "14-07-2026" */
  fileDate?: string;
  /** Bron van de thumbnail. Zonder deze prop (bijv. bij een pdf) wordt een leeg grijs vlak getoond. */
  thumbnailSrc?: string;
  /**
   * Link naar het bestand. Met href wordt de bijlage een <a> (verstuurd bericht),
   * zonder href een <div> (gekozen bestand in het formulier, nog niet verstuurd).
   */
  href?: string;
  /** Tekst voor screenreaders vóór de bestandsnaam, bijv. "Bijlage" of "Gekozen bijlage" */
  label?: string;
};

export const MessageAttachment = ({
  fileName,
  fileType,
  fileSize,
  fileDate,
  thumbnailSrc,
  href,
  label = 'Bijlage',
  className,
  ...props
}: MessageAttachmentProps) => {
  const classNames = clsx('mijnservices-message-attachment', className);

  // Alleen de gegevens tonen die er zijn, gescheiden door komma's: (png, 228 kB, 14-07-2026)
  const details = [
    fileType && { key: 'type', value: fileType },
    fileSize && { key: 'size', value: fileSize },
    fileDate && { key: 'date', value: fileDate },
  ].filter(Boolean) as { key: string; value: string }[];

  const content = (
    <>
      {/* Altijd tonen: zonder thumbnail blijft het vlak leeg en kleurt de SCSS het grijs */}
      <span className="mijnservices-message-attachment__image">
        {thumbnailSrc && <img src={thumbnailSrc} alt="" />}
      </span>
      <span className="mijnservices-message-attachment__file-data">
        <span className="mijnservices-messages__visually-hidden">{label}: </span>
        <span className="mijnservices-message-attachment__file-name">{fileName}</span>
        {details.length > 0 && (
          <>
            {' ('}
            {details.map((detail, index) => (
              <React.Fragment key={detail.key}>
                {index > 0 && ', '}
                <span className={`mijnservices-message-attachment__file-${detail.key}`}>{detail.value}</span>
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

export default MessageAttachment;
