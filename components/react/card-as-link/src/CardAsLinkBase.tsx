import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { CardAsLinkAppearance } from './CardAsLink';

export type CardAsLinkBaseProps = HTMLAttributes<HTMLDivElement> & {
  appearance?: CardAsLinkAppearance;
};

export const CardAsLinkBase = ({ appearance = 'default', className, ...props }: CardAsLinkBaseProps) => {
  const classNames = clsx(
    'mijnservices-card-as-link',
    {
      'mijnservices-card-as-link--archived': appearance === 'archived',
      'mijnservices-card-as-link--list': appearance === 'list',
    },
    className,
  );

  return <div className={classNames} {...props}></div>;
};

export default CardAsLinkBase;
