import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
import { Messages, MessagesItem, Message, MessageText, MessageForm } from './index';

// Voorbeeld-thumbnail, zodat de story ook zonder internet werkt
const thumbnail =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"%3E%3Crect width="35" height="35" fill="%23c9d3df"/%3E%3Ccircle cx="17.5" cy="17.5" r="9" fill="none" stroke="%235c6b80" stroke-width="3"/%3E%3C/svg%3E';

// Lang gesprek met alle onderdelen: alinea's, "Nieuw bericht" en een bijlage
const fullConversation = (
  <>
    <MessagesItem>
      <Message
        variant="resident"
        author="Jij"
        dateTime="2026-07-12T13:30"
        time="12-07-2026 - 13:30"
        status="Status: verzonden"
      >
        Hallo, ik heb een tijd geleden een aanvraag gedaan voor de witgoedregeling, maar sindsdien niets meer gehoord.
        Ik zou graag een wasmachine willen kopen om weer te kunnen wassen. Kunt u mij laten weten wat de status is?
      </Message>
    </MessagesItem>

    <MessagesItem>
      <Message variant="organization" author="Gemeente Voorbeeld" dateTime="2026-07-13T09:30" time="13/07/2026 - 09:30">
        <MessageText>Hartelijk dank voor uw bericht. Wij hebben uw vraag in goede orde ontvangen.</MessageText>
        <MessageText>
          Wij streven ernaar om binnen 24 uur te reageren. Hebt u in de tussentijd aanvullende informatie of vragen? Dan
          kunt u reageren op dit bericht.
        </MessageText>
        <MessageText>
          Met vriendelijke groet,
          <br />
          Gemeente Voorbeeld
        </MessageText>
      </Message>
    </MessagesItem>

    <MessagesItem isNew>
      <Message variant="organization" author="Gemeente Voorbeeld" dateTime="2026-07-13T09:30" time="13/07/2026 - 09:30">
        Om je aanvraag voor de witgoedregeling verder te kunnen beoordelen, hebben wij nog aanvullende informatie nodig
        over je oude wasmachine. Kun je aangeven hoe oud de wasmachine is, wat het probleem ermee is en waarom deze
        vervangen moet worden?
      </Message>
    </MessagesItem>

    <MessagesItem>
      <Message
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
      </Message>
    </MessagesItem>
  </>
);

// Kort gesprek voor de meeste stories
const shortConversation = (
  <>
    <MessagesItem>
      <Message
        variant="resident"
        author="Jij"
        dateTime="2026-07-12T13:30"
        time="12-07-2026 - 13:30"
        status="Status: verzonden"
      >
        Hallo, ik heb een aanvraag gedaan voor de witgoedregeling. Kunt u mij laten weten wat de status is?
      </Message>
    </MessagesItem>

    <MessagesItem isNew>
      <Message variant="organization" author="Gemeente Voorbeeld" dateTime="2026-07-13T09:30" time="13/07/2026 - 09:30">
        Hartelijk dank voor uw bericht. Wij nemen uw aanvraag binnen 5 werkdagen in behandeling.
      </Message>
    </MessagesItem>
  </>
);

// Gesprek waarin om een bijlage wordt gevraagd
const attachmentConversation = (
  <>
    <MessagesItem>
      <Message variant="organization" author="Gemeente Voorbeeld" dateTime="2026-07-13T09:30" time="13/07/2026 - 09:30">
        Kunt u een foto van uw oude wasmachine sturen?
      </Message>
    </MessagesItem>

    <MessagesItem>
      <Message
        variant="resident"
        author="Jij"
        dateTime="2026-07-14T10:30"
        time="14-07-2026 - 10:30"
        status="Status: verzonden"
      >
        Ja, die stuur ik hierbij mee.
      </Message>
    </MessagesItem>
  </>
);

const meta: Meta<typeof Messages> = {
  title: 'React/Messages',
  component: Messages,
  parameters: {
    // Breder dan de standaard 600px uit preview.tsx, zodat de desktop-layout zichtbaar is
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
    meta: { control: false },
    form: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Messages>;

/** Gesprek met formulier. Kies een bestand om de bijlage-preview te zien. */
export const Default: Story = {
  args: {
    form: <MessageForm />,
  },
};

/** Zonder formulier: een gesprek dat je alleen kunt lezen. Met alle onderdelen: alinea's, "Nieuw bericht" en een bijlage. */
export const ReadOnly: Story = {
  args: {
    children: fullConversation,
  },
};

/** Met een foutmelding boven het invoerveld (role="alert") */
export const WithError: Story = {
  args: {
    form: <MessageForm error="Het bericht kon niet worden verstuurd. Probeer het later opnieuw." />,
  },
};

/**
 * Met een gekozen bestand dat nog niet is verstuurd. De story kiest het bestand automatisch
 * (play-functie), net alsof de gebruiker op de bijlageknop heeft geklikt.
 */
export const WithSelectedFile: Story = {
  args: {
    children: attachmentConversation,
    form: <MessageForm />,
  },
  play: async ({ canvasElement }) => {
    const fileInput = canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
    if (!fileInput) return;

    // Voorbeeldbestand: een afbeelding, zodat ook de thumbnail zichtbaar is
    const image = decodeURIComponent(thumbnail.replace('data:image/svg+xml,', ''));
    const file = new File([image], 'wasmachine.png', {
      type: 'image/svg+xml',
      lastModified: new Date('2026-08-06').getTime(),
    });

    await userEvent.upload(fileInput, file);
  },
};
