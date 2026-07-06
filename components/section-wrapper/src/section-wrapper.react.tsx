import React from 'react';
import { createComponent } from '@lit/react';
import { MijnservicesSectionWrapper } from './section-wrapper.js';

export const SectionWrapper = createComponent({
  tagName: 'mijnservices-section-wrapper',
  elementClass: MijnservicesSectionWrapper,
  react: React,
});
