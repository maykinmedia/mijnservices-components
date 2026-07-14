import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { CaseCardAppearance } from './CaseCard';

export type CaseCardBaseProps = HTMLAttributes<HTMLDivElement> & {
  appearance?: CaseCardAppearance;
};

export const CaseCardBase = ({ appearance = 'default', className, ...props }: CaseCardBaseProps) => {
  const classNames = clsx(
    'mijnservices-case-card',
    {
      'mijnservices-case-card--archived': appearance === 'archived',
      'mijnservices-case-card--list': appearance === 'list',
    },
    className,
  );

  return <div className={classNames} {...props}></div>;
};

export default CaseCardBase;
