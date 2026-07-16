import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export type CardAsLinkBackgroundProps = HTMLAttributes<HTMLDivElement>;

export const CardAsLinkBackground = ({ className, ...props }: CardAsLinkBackgroundProps) => {
  const classNames = clsx('mijnservices-card-as-link__background', className);
  return <div className={classNames} {...props}></div>;
};

export default CardAsLinkBackground;
