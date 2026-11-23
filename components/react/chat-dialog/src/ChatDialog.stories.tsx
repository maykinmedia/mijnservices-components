import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Button } from '@nl-design-system-candidate/button-react';
import { ChatMessage, ChatMessageText } from '@mijnservices/chat-message';
import { ChatDialog, ChatDialogItem, ChatMessageForm } from './index';

// Inline thumbnail so the story works offline
const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"%3E%3Crect width="35" height="35" fill="%23c9d3df"/%3E%3Ccircle cx="17.5" cy="17.5" r="9" fill="none" stroke="%235c6b80" stroke-width="3"/%3E%3C/svg%3E';

// All parts: paragraphs, "new message" divider and an attachment
const fullConversation = (
  <>
    <ChatDialogItem>
      <ChatMessage
        variant="resident"
        author="Jij"
        dateTime="2026-07-12T13:30"
        time="12-07-2026 - 13:30"
        status="Status: verzonden"
      >
        Hallo, ik heb een tijd geleden een aanvraag gedaan voor de witgoedregeling, maar sindsdien niets meer gehoord.
        Ik zou graag een wasmachine willen kopen om weer te kunnen wassen. Kunt u mij laten weten wat de status is?
      </ChatMessage>
    </ChatDialogItem>

    <ChatDialogItem>
      <ChatMessage
        variant="organization"
        author="Gemeente Voorbeeld"
        dateTime="2026-07-13T09:30"
        time="13/07/2026 - 09:30"
      >
        <ChatMessageText>Hartelijk dank voor uw bericht. Wij hebben uw vraag in goede orde ontvangen.</ChatMessageText>
        <ChatMessageText>
          Wij streven ernaar om binnen 24 uur te reageren. Hebt u in de tussentijd aanvullende informatie of vragen? Dan
          kunt u reageren op dit bericht.
        </ChatMessageText>
        <ChatMessageText>
          Met vriendelijke groet,
          <br />
          Gemeente Voorbeeld
        </ChatMessageText>
      </ChatMessage>
    </ChatDialogItem>

    <ChatDialogItem isNew>
      <ChatMessage
        variant="organization"
        author="Gemeente Voorbeeld"
        dateTime="2026-07-13T09:30"
        time="13/07/2026 - 09:30"
      >
        Om je aanvraag voor de witgoedregeling verder te kunnen beoordelen, hebben wij nog aanvullende informatie nodig
        over je oude wasmachine. Kun je aangeven hoe oud de wasmachine is, wat het probleem ermee is en waarom deze
        vervangen moet worden?
      </ChatMessage>
    </ChatDialogItem>

    <ChatDialogItem>
      <ChatMessage
        variant="resident"
        author="Jij"
        dateTime="2026-07-14T10:30"
        time="14-07-2026 - 10:30"
        status="Status: verzonden"
        attachments={[
          {
            href: '#',
            fileName: 'wasmachine.png',
            fileType: 'png',
            fileSize: '228 kB',
            fileDate: '14-07-2026',
            thumbnailSrc: thumbnail,
          },
        ]}
      >
        Ja, hier is een foto van de wasmachine.
      </ChatMessage>
    </ChatDialogItem>
  </>
);

const shortConversation = (
  <>
    <ChatDialogItem>
      <ChatMessage
        variant="resident"
        author="Jij"
        dateTime="2026-07-12T13:30"
        time="12-07-2026 - 13:30"
        status="Status: verzonden"
      >
        Hallo, ik heb een aanvraag gedaan voor de witgoedregeling. Kunt u mij laten weten wat de status is?
      </ChatMessage>
    </ChatDialogItem>

    <ChatDialogItem isNew>
      <ChatMessage
        variant="organization"
        author="Gemeente Voorbeeld"
        dateTime="2026-07-13T09:30"
        time="13/07/2026 - 09:30"
      >
        Hartelijk dank voor uw bericht. Wij nemen uw aanvraag binnen 5 werkdagen in behandeling.
      </ChatMessage>
    </ChatDialogItem>
  </>
);

const attachmentConversation = (
  <>
    <ChatDialogItem>
      <ChatMessage
        variant="organization"
        author="Gemeente Voorbeeld"
        dateTime="2026-07-13T09:30"
        time="13/07/2026 - 09:30"
      >
        Kunt u een foto van uw oude wasmachine sturen?
      </ChatMessage>
    </ChatDialogItem>

    <ChatDialogItem>
      <ChatMessage
        variant="resident"
        author="Jij"
        dateTime="2026-07-14T10:30"
        time="14-07-2026 - 10:30"
        status="Status: verzonden"
      >
        Ja, die stuur ik hierbij mee.
      </ChatMessage>
    </ChatDialogItem>
  </>
);

const meta: Meta<typeof ChatDialog> = {
  title: 'React/ChatDialog',
  component: ChatDialog,
  parameters: {
    // Wider than the 600px default in preview.tsx to show the desktop layout
    maxInlineSize: '960px',
  },
  args: {
    title: 'Status van mijn zaak',
    headingLevel: 2,
    meta: (
      <>
        Gesprek gestart op <time dateTime="2026-08-31">31-08-2026</time>
      </>
    ),
    caseNumber: 'Zaaknummer: 4503-2026',
    children: shortConversation,
  },
  argTypes: {
    title: { control: 'text' },
    headingLevel: { control: 'select', options: [2, 3, 4, 5, 6] },
    caseNumber: { control: 'text' },
    announcement: { control: 'text' },
    meta: { control: false },
    form: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ChatDialog>;

/** With form. Select a file to see the attachment preview. */
export const Default: Story = {
  args: {
    form: <ChatMessageForm />,
  },
};

/** Read-only, without form. Shows paragraphs, the "new message" divider and an attachment. */
export const ReadOnly: Story = {
  args: {
    children: fullConversation,
  },
};

/** Error message above the field (role="alert"). */
export const WithError: Story = {
  args: {
    form: <ChatMessageForm error="Het bericht kon niet worden verstuurd. Probeer het later opnieuw." />,
  },
};

/** Selected file, not yet sent. The play function selects it automatically. */
export const WithSelectedFile: Story = {
  args: {
    children: attachmentConversation,
    form: <ChatMessageForm />,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    if (!fileInput) return;

    // Image, so the thumbnail is shown
    const image = decodeURIComponent(thumbnail.replace('data:image/svg+xml,', ''));
    const file = new File([image], 'wasmachine.png', {
      type: 'image/svg+xml',
      lastModified: new Date('2026-08-06').getTime(),
    });

    await userEvent.upload(fileInput, file);
  },
};

// Simulates an HTMX swap: adds a message and sets the announcement
const NewMessageDemo = (args: React.ComponentProps<typeof ChatDialog>) => {
  const [count, setCount] = useState(0);

  const announcement =
    count === 0
      ? undefined
      : count === 1
        ? 'Nieuw bericht van Gemeente Voorbeeld'
        : `${count} nieuwe berichten van Gemeente Voorbeeld`;

  return (
    <>
      <Button purpose="secondary" label="Simuleer nieuw bericht" onClick={() => setCount(count + 1)} />
      <ChatDialog {...args} announcement={announcement}>
        {attachmentConversation}
        {Array.from({ length: count }, (_, index) => (
          <ChatDialogItem key={index} isNew={index === 0}>
            <ChatMessage
              variant="organization"
              author="Gemeente Voorbeeld"
              dateTime="2026-07-15T09:00"
              time="15-07-2026 - 09:00"
            >
              Bedankt voor de foto. Wij nemen uw aanvraag binnen 5 werkdagen in behandeling.
            </ChatMessage>
          </ChatDialogItem>
        ))}
      </ChatDialog>
    </>
  );
};

/** Click the button to add a message. Screen readers announce it via role="status" (prop announcement). */
export const NewMessage: Story = {
  args: {
    form: <ChatMessageForm />,
  },
  argTypes: {
    announcement: { control: false },
  },
  render: (args) => <NewMessageDemo {...args} />,
};
