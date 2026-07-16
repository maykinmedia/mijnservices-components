import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export type CardAsLinkWrapperProps = HTMLAttributes<HTMLDivElement>;

export const CardAsLinkWrapper = ({ className, ...props }: CardAsLinkWrapperProps) => {
  const classNames = clsx('mijnservices-card-as-link__wrapper', className);
  return <div className={classNames} {...props}></div>;
};

export default CardAsLinkWrapper;
