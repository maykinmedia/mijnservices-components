import React, { LiHTMLAttributes } from 'react';
import clsx from 'clsx';
import './styles/index.scss';

export type MessagesItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /** Toont de "Nieuw bericht"-scheidingslijn boven dit bericht. Wordt bepaald door de backend. */
  isNew?: boolean;
  /** Tekst in de scheidingslijn. Standaard "Nieuw bericht". */
  newLabel?: string;
};

// NOTE: text props such as `newLabel` currently have Dutch default values and are not translated yet.
// Projects in another language must pass their own texts via these props.
export const MessagesItem = ({
  isNew = false,
  newLabel = 'Nieuw bericht',
  className,
  children,
  ...props
}: MessagesItemProps) => {
  const classNames = clsx(
    'mijnservices-messages__item',
    {
      'mijnservices-messages__item--new': isNew,
    },
    className,
  );

  return (
    <li className={classNames} {...props}>
      {isNew && (
        // Bewust een <div>, geen <hr> of role="separator": die kunnen geen leesbare
        // tekst bevatten, waardoor "Nieuw bericht" niet (betrouwbaar) wordt voorgelezen. De lijnen zijn CSS.
        <div className="mijnservices-messages__divider">
          <span className="mijnservices-messages__divider-label">{newLabel}</span>
        </div>
      )}
      {children}
    </li>
  );
};

export default MessagesItem;
