import React, { AnchorHTMLAttributes, ComponentType } from 'react';
import clsx from 'clsx';

export interface CaseCardActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Injecteer hier je eigen Link-component (bijv. react-router's Link) indien gewenst */
  Action?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export const CaseCardAction = ({ className, children, Action = 'a', ...props }: CaseCardActionProps) => {
  const classNames = clsx('mijnservices-case-card__action', className);
  const Component = Action as ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>> | 'a';

  return (
    <Component {...props} className={classNames}>
      {children}
    </Component>
  );
};

export default CaseCardAction;
