import React, { AnchorHTMLAttributes, ElementType } from 'react';
import clsx from 'clsx';

export interface CardAsLinkActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Injecteer hier je eigen Link-component (bijv. react-router's Link) indien gewenst */
  Action?: ElementType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export const CardAsLinkAction = ({ className, children, Action = 'a', ...props }: CardAsLinkActionProps) => {
  const classNames = clsx('mijnservices-card-as-link__action', className);
  const Component = Action;

  return (
    <Component {...props} className={classNames}>
      {children}
    </Component>
  );
};

export default CardAsLinkAction;
