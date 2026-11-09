# @mijnservices/messages

[![npm](https://img.shields.io/npm/v/@mijnservices/messages)](https://www.npmjs.com/package/@mijnservices/messages)

A chat/messages component (naming is still work in progress), that contains individual chat bubbles (single message). Part of [mijnservices-components](https://github.com/maykinmedia/mijnservices-components), built on NL Design System architecture.

## Install

```bash
npm install @mijnservices/messages
```

## Usage

### React

```tsx
import { Messages } from "@mijnservices/messages/react";

<Messages>[...]</Messages>;
```

## Props / attributes

| Attribute   | Type     | Default | Description                                                           |
| ----------- | -------- | ------- | --------------------------------------------------------------------- |
|             |
| `date-time` | `string` | `''`    | Machine-readable ISO date passed to the underlying `<time datetime>`. |

## Slots

| Slot      | Purpose                                             |
| --------- | --------------------------------------------------- |
| `heading` | Contains the single message bubble sender/receiver. |
| (default) | Body content below the heading.                     |

## Accessibility

This chat/messages component should work the same for slow chats as for live/quick chats, with the following WCAG aspects to consider:

### `.mijnservices-messages` (parent component)

- **Chat history container:** `.mijnservices-messages__body` has `role="log"`.
  - Do **not** use `role="alert"` or `aria-live="assertive"` here: or those interrupt the user for every new message. `role="log"` already announces new messages politely.
- **Chat history list structure:** inside `.mijnservices-messages__body`, messages are an ordered list: `<ol class="mijnservices-messages__list">` with one `<li class="mijnservices-messages__item">` per message.
- **Refresh behaviour:** if the chat does not refresh live, show a visible text such as "Reload the page to see new messages".
- **Chatbot:** if a chatbot is used, make this clear to the user in text, e.g. in the sender name ("Chatbot van Gemeente Voorbeeld").

### `.mijnservices-message` (single message bubble)

- **Who, when, what, status:** every message exposes these four things as **text** in the accessibility tree, so never only through colour or alignment ("niet enkel aangeven met kleur of alignment"):
  - **Who:** `.mijnservices-message__header` (sender), e.g. "Message from Gemeente Voorbeeld".
  - **When:** `.mijnservices-message__time`, a `<time datetime="…">` element.
  - **What:** `.mijnservices-message__body`, the message content.
  - **Status:** `.mijnservices-message__status`, e.g. "Sending", "Sent", "Failed" (only on the user's own messages).
- **Accessible name:** the `<article class="mijnservices-message">` is labelled by sender + time via `aria-labelledby`.

### `.mijnservices-message-form` (input form, part of `.mijnservices-messages`)

- **Sending status:** `.mijnservices-message-form__status` has `role="status"`, e.g. "Sending message…" / "Message sent".
- **Errors:** `.mijnservices-message-form__error` has `role="alert"`, e.g. "Message could not be sent".
- **Live regions in the DOM:** both elements are present in the HTML from the start (empty). Text is added later with JS; otherwise screen readers will not announce it.
- **Link to the chat (optional):** the textarea and submit button may use `aria-controls="messages-log"`. Note: only JAWS supports this.

## Code Structure

CSS: we are using logical properties, so instead of `margin` and `max-width` we are using `margin-inline-start`/`margin-block-end` and `max-inline-size`.
It's desktop-first.
We did not add fallback values, so not yet incorporated: "Gebruik basis tokens als fallback voor de design beslissingen in componenten die nog niet in de community zitten".
NLDS requirement: always combine font-size with line-height.
NLDS requirement: always combine color with background-color for contrast.
HTML: we use @nl-design-system-candidate/button-react as a dependency

## Theming

Theming can be done by overwriting the design-token values.

## Documentation

Live examples and the full design token reference: [Storybook](https://maykinmedia.github.io/mijnservices-components/?path=/docs/introduction--docs)

## References

NLDS Discussion MijnGesprekken: https://github.com/orgs/nl-design-system/discussions/449

## License

EUPL-1.2
