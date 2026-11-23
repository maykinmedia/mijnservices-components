import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatMessage, ChatMessageText } from './index';

// Inline thumbnail so the story works offline
const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"%3E%3Crect width="35" height="35" fill="%23c9d3df"/%3E%3Ccircle cx="17.5" cy="17.5" r="9" fill="none" stroke="%235c6b80" stroke-width="3"/%3E%3C/svg%3E';

const meta: Meta<typeof ChatMessage> = {
  title: 'React/ChatMessage',
  component: ChatMessage,
  args: {
    variant: 'organization',
    author: 'Gemeente Voorbeeld',
    dateTime: '2026-07-13T09:30',
    time: '13-07-2026 - 09:30',
    children: 'Hartelijk dank voor uw bericht. Wij nemen uw aanvraag binnen 5 werkdagen in behandeling.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['organization', 'resident'] },
    author: { control: 'text' },
    time: { control: 'text' },
    children: { control: 'text' },
    attachments: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

/** Message from the organization. */
export const Default: Story = {};

/** Message from the resident, with a status for screen readers. */
export const Resident: Story = {
  args: {
    variant: 'resident',
    author: 'Jij',
    dateTime: '2026-07-12T13:30',
    time: '12-07-2026 - 13:30',
    status: 'Status: verzonden',
    children: 'Hallo, ik heb een aanvraag gedaan voor de witgoedregeling. Kunt u mij laten weten wat de status is?',
  },
};

/** Multiple paragraphs with ChatMessageText. */
export const WithParagraphs: Story = {
  args: {
    children: (
      <>
        <ChatMessageText>Hartelijk dank voor uw bericht. Wij hebben uw vraag in goede orde ontvangen.</ChatMessageText>
        <ChatMessageText>Wij streven ernaar om binnen 24 uur te reageren.</ChatMessageText>
        <ChatMessageText>
          Met vriendelijke groet,
          <br />
          Gemeente Voorbeeld
        </ChatMessageText>
      </>
    ),
  },
  argTypes: {
    children: { control: false },
  },
};

/**
 * Multiple attachments, e.g. from the organization's case system: a PDF with placeholder and an image with thumbnail.
 * The resident can currently send one file per message.
 */
export const WithAttachments: Story = {
  args: {
    children: 'Hierbij ontvangt u de beschikking en een overzicht van de winkels waar u de wasmachine kunt kopen.',
    attachments: [
      {
        href: '#',
        fileName: 'beschikking.pdf',
        fileType: 'pdf',
        fileSize: '1,5 MB',
        fileDate: '15-07-2026',
      },
      {
        href: '#',
        fileName: 'winkels.png',
        fileType: 'png',
        fileSize: '228 kB',
        fileDate: '15-07-2026',
        thumbnailSrc: thumbnail,
      },
    ],
  },
};
