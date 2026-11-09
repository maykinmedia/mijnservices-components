import React, { LiHTMLAttributes } from 'react';
import clsx from 'clsx';
import './styles/index.scss';

// Text props have Dutch defaults; override them for other languages.
export type ChatDialogItemProps = LiHTMLAttributes<HTMLLIElement> & {
  /** Shows the "new message" divider above this message. Set by the backend. */
  isNew?: boolean;
  /** Divider text. Default "Nieuw bericht". */
  newLabel?: string;
};

export const ChatDialogItem = ({
  isNew = false,
  newLabel = 'Nieuw bericht',
  className,
  children,
  ...props
}: ChatDialogItemProps) => {
  const classNames = clsx(
    'mijn-chat-dialog__item',
    {
      'mijn-chat-dialog__item--new': isNew,
    },
    className,
  );

  return (
    <li className={classNames} {...props}>
      {isNew && (
        // <div>, not <hr> or role="separator": those can't hold text that is read reliably by screen readers. Lines are CSS.
        <div className="mijn-chat-dialog__divider">
          <span className="mijn-chat-dialog__divider-label">{newLabel}</span>
        </div>
      )}
      {children}
    </li>
  );
};

export default ChatDialogItem;
