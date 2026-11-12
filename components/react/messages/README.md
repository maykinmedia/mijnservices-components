# @mijnservices/messages

[![npm](https://img.shields.io/npm/v/@mijnservices/messages)](https://www.npmjs.com/package/@mijnservices/messages)

A chat/messages component (naming is still work in progress), that contains individual chat bubbles (single message). Part of [mijnservices-components](https://github.com/maykinmedia/mijnservices-components), built on NL Design System architecture.

## Install

```bash
npm install @mijnservices/messages
```

## Accessibility

This chat/messages component should work the same for slow chats as for live/quick chats, with the following WCAG aspects to consider:

### `.mijnservices-messages` (parent component)

- **Chat history container:** `.mijnservices-messages__body` has `role="log"`.
  - Do **not** use `role="alert"` or `aria-live="assertive"` here: those interrupt the user for every new message. `role="log"` already announces new messages politely.
- **Chat history list structure:** inside `.mijnservices-messages__body`, messages are an ordered list: `<ol class="mijnservices-messages__list">` with one `<li class="mijnservices-messages__item">` per message.
- **"Nieuw bericht" divider:** a `<div>` with plain text, not an `<hr>` or `role="separator"`: those cannot contain readable text. The lines are CSS.
- **Refresh behaviour:** if the chat does not refresh live, show a visible text such as "Reload the page to see new messages".
- **Chatbot:** if a chatbot is used, make this clear to the user in text, e.g. in the sender name ("Chatbot van Gemeente Voorbeeld").

### `.mijnservices-message` (single message bubble)

- **Who, when, what, status:** every message exposes these four things as **text** in the accessibility tree, so never only through colour or alignment ("niet enkel aangeven met kleur of alignment"):
  - **Who:** `.mijnservices-message__author` (sender), e.g. "Bericht van Gemeente Voorbeeld".
  - **When:** `.mijnservices-message__time`, a `<time datetime="…">` element.
  - **What:** `.mijnservices-message__body`, the message content.
  - **Status:** `.mijnservices-message__status`, e.g. "Sending", "Sent", "Failed" (only on the user's own messages).
- **Accessible name:** the `<article class="mijnservices-message">` is labelled by sender + time via `aria-labelledby`.
- **Attachments:** the thumbnail has `alt=""` because the file name is shown next to it.

### `.mijnservices-message-form` (input form, part of `.mijnservices-messages`)

- **Sending status:** `.mijnservices-message-form__status` has `role="status"`, e.g. "Sending message…" / "Message sent", is now optional and may not be needed.
- **Errors:** `.mijnservices-message-form__error` has `role="alert"`, e.g. "Message could not be sent".
- **Live regions in the DOM:** `.mijnservices-message-form__error` and `.mijnservices-message-form__status` are always present in the HTML, also when they are empty. Screen readers only announce text that is added to a live region that already exists in the DOM on load.
- **Attachment button:** an icon-only NLDS Button with a label for screen readers. The real file input is hidden; the button opens it, so there is only one tab stop.
- **Link to the chat (optional):** the textarea and submit button use `aria-controls` with the id of the message list. Inside `Messages` this is done automatically. Note: only JAWS supports this.
- **Id's:** all id's for `aria-labelledby`, `aria-describedby` and `aria-controls` are generated with React `useId()`, so they stay unique when the component is used more than once on a page.

## Usage

### React

```tsx
import { Messages, MessagesItem, Message, MessageText, MessageForm } from "@mijnservices/messages";
import "@mijnservices/messages/index.css";

<Messages
  title="Status van mijn zaak"
  meta={
    <>
      Gesprek gestart op <time dateTime="2026-08-31">31-08-2026</time>
    </>
  }
  caseNumber="Zaaknummer: 4503-2026"
  form={
    <MessageForm action="/inbox/" method="post" encType="multipart/form-data" accept=".pdf,.png,.jpg">
      <input type="hidden" name="csrfmiddlewaretoken" value="…" />
    </MessageForm>
  }
>
  <MessagesItem>
    <Message variant="resident" author="Jij" dateTime="2026-07-12T13:30" time="12-07-2026 - 13:30">
      Hallo…
    </Message>
  </MessagesItem>
  <MessagesItem isNew>
    <Message
      variant="organization"
      author="Gemeente Voorbeeld"
      dateTime="2026-07-13T09:30"
      time="13/07/2026 - 09:30"
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
      <MessageText>First paragraph.</MessageText>
      <MessageText>Second paragraph.</MessageText>
    </Message>
  </MessagesItem>
</Messages>;
```

The component is "dumb": it only displays what it receives. Sending, refreshing, validation and deciding which message is new are done by the backend or the project.

## Components and props

All visible texts have a Dutch default and can be changed with a prop. All components also accept `className` and the regular HTML attributes of their root element.

### `Messages`

The whole conversation: header, message list (`role="log"`) and optional form.

| Prop           | Type                    | Default       | Description                                                                   |
| -------------- | ----------------------- | ------------- | ----------------------------------------------------------------------------- |
| `title`        | `ReactNode`             | –             | Title of the conversation (NLDS Heading). Required.                           |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `2`           | Heading level of the title.                                                   |
| `meta`         | `ReactNode`             | –             | Line below the title, e.g. the start date.                                    |
| `caseNumber`   | `ReactNode`             | –             | Case number, shown next to the title.                                         |
| `logLabel`     | `string`                | `"Berichten"` | Accessible name of the message list.                                          |
| `form`         | `ReactNode`             | –             | Slot for the form, usually `<MessageForm />`. Leave out for a read-only chat. |
| `children`     | `ReactNode`             | –             | The messages: `<MessagesItem>` elements.                                      |

### `MessagesItem`

One `<li>` in the message list.

| Prop       | Type      | Default           | Description                                                               |
| ---------- | --------- | ----------------- | ------------------------------------------------------------------------- |
| `isNew`    | `boolean` | `false`           | Shows the "Nieuw bericht" divider above this message. Set by the backend. |
| `newLabel` | `string`  | `"Nieuw bericht"` | Text in the divider.                                                      |

### `Message`

One chat bubble (`<article>`). Plain text as `children` becomes a paragraph automatically; use `MessageText` (NLDS Paragraph) for multiple paragraphs.

| Prop           | Type                           | Default                             | Description                                                |
| -------------- | ------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| `variant`      | `"resident" \| "organization"` | –                                   | Resident (right) or organization (left). Required.         |
| `author`       | `ReactNode`                    | –                                   | Sender, e.g. "Jij" or "Gemeente Voorbeeld". Required.      |
| `dateTime`     | `string`                       | –                                   | Machine-readable date for `<time datetime>`. Required.     |
| `time`         | `ReactNode`                    | –                                   | Readable date and time. Required.                          |
| `authorPrefix` | `string`                       | `"Bericht van"`                     | Screen reader text before the sender.                      |
| `timePrefix`   | `string`                       | `"Verzonden op"` / `"Ontvangen op"` | Screen reader text before the time (depends on `variant`). |
| `status`       | `string`                       | –                                   | Screen reader status, e.g. "Status: verzonden".            |
| `attachments`  | `MessageAttachmentProps[]`     | –                                   | Attachments below the text.                                |

### `MessageAttachment`

An attachment: thumbnail + "name (type, size, date)". With `href` it is a link (sent message), without `href` a preview (selected file in the form).

| Prop                               | Type     | Default     | Description                                                                                        |
| ---------------------------------- | -------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `fileName`                         | `string` | –           | Required.                                                                                          |
| `fileType`, `fileSize`, `fileDate` | `string` | –           | Readable texts, e.g. "png", "228 kB", "14-07-2026". Not formatted by the component.                |
| `thumbnailSrc`                     | `string` | –           | Without a thumbnail (e.g. a pdf) an empty grey square is shown.                                    |
| `href`                             | `string` | –           | Link to the file. Whether it opens or downloads is decided by the backend (`Content-Disposition`). |
| `label`                            | `string` | `"Bijlage"` | Screen reader text before the file name.                                                           |

### `MessageForm`

Textarea, attachment button, preview of the selected file, send button, error and status. Only one file can be selected.

| Prop                            | Type                           | Default                | Description                                                                                   |
| ------------------------------- | ------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------- |
| `accept`                        | `string`                       | –                      | Allowed file types, from the backend. Without it all files are allowed. Not a security check. |
| `error`                         | `ReactNode`                    | –                      | Error message (`role="alert"`).                                                               |
| `status`                        | `ReactNode`                    | –                      | Sending status (`role="status"`).                                                             |
| `label`, `placeholder`          | `string`                       | `"Schrijf uw bericht"` | Label (screen readers only) and placeholder of the textarea.                                  |
| `submitLabel`                   | `string`                       | `"Versturen"`          | Text of the send button.                                                                      |
| `uploadLabel`                   | `string`                       | `"Bijlage toevoegen"`  | Text of the attachment button (screen readers only).                                          |
| `selectedFileLabel`             | `string`                       | `"Gekozen bijlage"`    | Screen reader text before the selected file.                                                  |
| `textareaName`, `fileInputName` | `string`                       | `"content"`, `"file"`  | `name` of the textarea and file input.                                                        |
| `uploadIcon`, `submitIcon`      | `ReactNode`                    | built-in SVG icons     | Own icons, e.g. Font Awesome or Material UI. Give them `aria-hidden="true"`.                  |
| `logId`                         | `string`                       | from `Messages`        | Id of the message list for `aria-controls`. Automatic inside `Messages`.                      |
| `textareaProps`                 | `object`                       | –                      | Extra attributes for the textarea, e.g. `value` and `onChange`.                               |
| `onFileChange`                  | `(file: File \| null) => void` | –                      | Called when the user selects a file.                                                          |
| `children`                      | `ReactNode`                    | –                      | Extra fields, e.g. the csrf token.                                                            |

## Code Structure

CSS: we are using logical properties, so instead of `margin` and `max-width` we are using `margin-inline-start`/`margin-block-end` and `max-inline-size`.
It's desktop-first, with one breakpoint: everything up to 480px is the mobile design (screens from 360px are supported).
We did not add fallback values, so not yet incorporated: "Gebruik basis tokens als fallback voor de design beslissingen in componenten die nog niet in de community zitten".
NLDS requirement: always combine font-size with line-height.
NLDS requirement: always combine color with background-color for contrast.
HTML: we use the NLDS candidate components `@nl-design-system-candidate/button-react`, `heading-react` and `paragraph-react` as dependencies. Their CSS is imported by the components, so your bundler must support CSS imports.
SCSS: one partial per BEM block (`_messages.scss`, `_message.scss`, `_message-attachment.scss`, `_message-form.scss`). Each React component imports the styles itself.

## Theming

Theming can be done by overwriting the design-token values.

- The npm package ships empty tokens: without a theme the component is unstyled.
- All component tokens are listed in `tokens.json` (without `$value`) and on the "Design Tokens" page in Storybook, with a JSON and CSS template to copy.
- Buttons, headings and paragraphs are NLDS candidate components: theme them with their own `--nl-button-*`, `--nl-heading-*` and `--nl-paragraph-*` tokens.
- The values used in our Storybook live in `.storybook-react/messages-theme.css` (not published).

## Documentation

Live examples and the full design token reference: [Storybook](https://maykinmedia.github.io/mijnservices-components/?path=/docs/introduction--docs)

## References

NLDS Discussion MijnGesprekken: https://github.com/orgs/nl-design-system/discussions/449

## License

EUPL-1.2
