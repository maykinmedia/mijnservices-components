import React, { LiHTMLAttributes } from 'react';
import clsx from 'clsx';

export type MessagesItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /** Toont de "Nieuw bericht"-scheidingslijn boven dit bericht. Wordt bepaald door de backend. */
  isNew?: boolean;
  /** Tekst in de scheidingslijn. Standaard "Nieuw bericht". */
  newLabel?: string;
};

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
        <div className="mijnservices-messages__divider">
          <span className="mijnservices-messages__divider-label">{newLabel}</span>
        </div>
      )}
      {children}
    </li>
  );
};

export default MessagesItem;
