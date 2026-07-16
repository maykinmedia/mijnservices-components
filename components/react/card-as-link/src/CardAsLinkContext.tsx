import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export type CardAsLinkContextProps = HTMLAttributes<HTMLDivElement>;

export const CardAsLinkContext = ({ className, ...props }: CardAsLinkContextProps) => {
  const classNames = clsx('mijnservices-card-as-link__context', className);
  return <div className={classNames} {...props}></div>;
};

export default CardAsLinkContext;
