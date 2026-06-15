import React from 'react';
import { createComponent } from '@lit/react';
import { MijnservicesPlanCard } from './plan-card.js';

export const Card = createComponent({
  tagName: 'mijnservices-plan-card',
  elementClass: MijnservicesPlanCard,
  react: React,
});
