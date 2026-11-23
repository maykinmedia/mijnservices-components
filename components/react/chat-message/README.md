# @mijnservices/chat-message

[![npm](https://img.shields.io/npm/v/@mijnservices/chat-message)](https://www.npmjs.com/package/@mijnservices/chat-message)

A single chat message (chat bubble), with optional attachments. Can be used on its own or inside [`@mijnservices/chat-dialog`](https://www.npmjs.com/package/@mijnservices/chat-dialog). Part of [mijnservices-components](https://github.com/maykinmedia/mijnservices-components), built on NL Design System architecture.

## Install

```bash
npm install @mijnservices/chat-message
```

## Accessibility

### `.mijn-chat-message` (single message bubble)

- **Who, when, what, status:** every message exposes these four things as **text** in the accessibility tree, so never only through colour or alignment ("niet enkel aangeven met kleur of alignment"):
  - **Who:** `.mijn-chat-message__author` (sender), e.g. "Bericht van Gemeente Voorbeeld".
  - **When:** `.mijn-chat-message__time`, a `<time datetime="…">` element.
  - **What:** `.mijn-chat-message__body`, the message content.
  - **Status:** `.mijn-chat-message__status`, e.g. "Sending", "Sent", "Failed" (only on the user's own messages).
- **Accessible name:** the `<article class="mijn-chat-message">` is labelled by sender + time via `aria-labelledby`.
- **No live region:** a message does not announce itself. Announcing new messages is done by the container, e.g. the `announcement` prop of `ChatDialog`.
- **Id's:** id's for `aria-labelledby` are generated with React `useId()`, so they stay unique when the component is used more than once on a page.

### `.mijn-chat-message-attachment`

- **Thumbnail:** has `alt=""` because the file name is shown next to it.
- **Label:** a screen reader text before the file name, e.g. "Bijlage".

## Usage

### React

```tsx
import { ChatMessage, ChatMessageText } from "@mijnservices/chat-message";
import "@mijnservices/chat-message/index.css";

<ChatMessage
  variant="organization"
  author="Gemeente Voorbeeld"
  dateTime="2026-07-13T09:30"
  time="13-07-2026 - 09:30"
  attachments={[
    {
      href: "/files/brief.pdf",
      fileName: "brief.pdf",
      fileType: "pdf",
      fileSize: "228 kB",
      fileDate: "13-07-2026",
    },
  ]}
>
  <ChatMessageText>First paragraph.</ChatMessageText>
  <ChatMessageText>Second paragraph.</ChatMessageText>
</ChatMessage>;
```

The component is "dumb": it only displays what it receives.

## Components and props

All texts have a Dutch default and can be changed with a prop. All components also accept `className` and the regular HTML attributes of their root element.

### `ChatMessage`

One chat bubble (`<article>`). Plain text as `children` becomes a paragraph automatically; use `ChatMessageText` for multiple paragraphs.

| Prop           | Type                           | Default                             | Description                                                |
| -------------- | ------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| `variant`      | `"resident" \| "organization"` | –                                   | Resident (right) or organization (left). Required.         |
| `author`       | `ReactNode`                    | –                                   | Sender, e.g. "Jij" or "Gemeente Voorbeeld". Required.      |
| `dateTime`     | `string`                       | –                                   | Machine-readable date for `<time datetime>`. Required.     |
| `time`         | `ReactNode`                    | –                                   | Readable date and time. Required.                          |
| `authorPrefix` | `string`                       | `"Bericht van"`                     | Screen reader text before the sender.                      |
| `timePrefix`   | `string`                       | `"Verzonden op"` / `"Ontvangen op"` | Screen reader text before the time (depends on `variant`). |
| `status`       | `string`                       | –                                   | Screen reader status, e.g. "Status: verzonden".            |
| `attachments`  | `ChatMessageAttachmentProps[]` | –                                   | Attachments below the text.                                |

The right/left alignment uses `align-self`, so it only works inside a flex column container, such as the message list of `ChatDialog`.

### `ChatMessageText`

One paragraph in a message (NLDS Paragraph). Accepts the props of the NLDS Paragraph.

### `ChatMessageAttachment`

An attachment: thumbnail + "name (type, size, date)". With `href` it is a link (sent message), without `href` a preview (e.g. a selected file in a form).

| Prop                               | Type     | Default     | Description                                                                                        |
| ---------------------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `fileName`                         | `string` | –           | Required.                                                                                          |
| `fileType`, `fileSize`, `fileDate` | `string` | –           | Readable texts, e.g. "png", "228 kB", "14-07-2026". Not formatted by the component.                |
| `thumbnailSrc`                     | `string` | –           | Without a thumbnail (e.g. a pdf) an empty grey square is shown.                                    |
| `href`                             | `string` | –           | Link to the file. Whether it opens or downloads is decided by the backend (`Content-Disposition`). |
| `label`                            | `string` | `"Bijlage"` | Screen reader text before the file name.                                                           |

## Code Structure

CSS: we are using logical properties, so instead of `margin` and `max-width` we are using `margin-inline-start`/`margin-block-end` and `max-inline-size`.
It's desktop-first, with one breakpoint: everything up to 480px is the mobile design (screens from 360px are supported).
We did not add fallback values, so not yet incorporated: "Gebruik basis tokens als fallback voor de design beslissingen in componenten die nog niet in de community zitten".
NLDS requirement: always combine font-size with line-height.
NLDS requirement: always combine color with background-color for contrast.
HTML: we use the NLDS candidate component `@nl-design-system-candidate/paragraph-react` as a dependency. Its CSS is imported by the components, so your bundler must support CSS imports.
SCSS: one partial per BEM block (`_chat-message.scss`, `_chat-message-attachment.scss`). Each React component imports the styles itself. This package also defines the utility class `.mijn-visually-hidden`.

## Theming

Theming can be done by overwriting the design-token values.

- The npm package ships empty tokens: without a theme the component is unstyled.
- All component tokens are listed in `tokens.json` (without `$value`) and on the "Design Tokens" page in Storybook, with a JSON and CSS template to copy.
- Paragraphs are NLDS candidate components: theme them with their own `--nl-paragraph-*` tokens.
- The values used in our Storybook live in `.storybook-react/chat-dialog-theme.css` (not published).

## Documentation

Live examples and the full design token reference: [Storybook](https://maykinmedia.github.io/mijnservices-components/?path=/docs/introduction--docs)

## License

EUPL-1.2
