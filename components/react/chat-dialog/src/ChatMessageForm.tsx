import React, {
  ChangeEvent,
  FormHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { Button } from '@nl-design-system-candidate/button-react';
import '@nl-design-system-candidate/button-react/css';
import { ChatMessageAttachment } from './ChatMessageAttachment';
import { useChatDialogContext } from './ChatDialog';
import './styles/index.scss';

// Text props have Dutch defaults; override them for other languages.
export type ChatMessageFormProps = FormHTMLAttributes<HTMLFormElement> & {
  /** Textarea label (screen readers only). Default "Schrijf uw bericht". */
  label?: string;
  /** Textarea placeholder. Default "Schrijf uw bericht". */
  placeholder?: string;
  /** Textarea name. Default "content". */
  textareaName?: string;
  /** File input name. Default "file". */
  fileInputName?: string;
  /** Allowed file types from the backend, e.g. ".pdf,.png". Omit to allow all. */
  accept?: string;
  /** Error message, e.g. "Bericht kon niet worden verzonden". Announced (role="alert"). */
  error?: ReactNode;
  /** Send status, e.g. "Bericht wordt verzonden…". Announced (role="status"). */
  status?: ReactNode;
  /** Submit button text. Default "Versturen". */
  submitLabel?: string;
  /** Upload button text (screen readers only). Default "Bijlage toevoegen". */
  uploadLabel?: string;
  /** Screen reader text before the selected file. Default "Gekozen bijlage". */
  selectedFileLabel?: string;
  /** Locale for the selected file's date and size, e.g. "en-GB". Default "nl-NL". */
  locale?: string;
  /** Message list id for aria-controls. Set automatically inside <ChatDialog>. */
  messagesId?: string;
  /** Extra textarea attributes, e.g. value and onChange */
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Called when the user selects a file */
  onFileChange?: (file: File | null) => void;
  /** Custom upload icon, e.g. Font Awesome or Material UI. Add aria-hidden="true". */
  uploadIcon?: ReactNode;
  /** Custom submit icon. Add aria-hidden="true". */
  submitIcon?: ReactNode;
};

type SelectedFile = {
  name: string;
  type: string;
  size: string;
  date: string;
  thumbnailSrc?: string;
};

// nl-NL: 233472 → "228 kB", 1572864 → "1,5 MB"
const formatFileSize = (bytes: number, locale: string) => {
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) return `${Math.max(1, Math.round(kilobytes))} kB`;
  const megabytes = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
    kilobytes / 1024,
  );
  return `${megabytes} MB`;
};

// nl-NL: "14-07-2026"
const formatFileDate = (timestamp: number, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(timestamp);

const PaperclipIcon = () => (
  <svg className="mijn-chat-message-form__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21.4 11.1-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"
    />
  </svg>
);

const SendIcon = () => (
  <svg className="mijn-chat-message-form__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"
    />
  </svg>
);

export const ChatMessageForm = ({
  label = 'Schrijf uw bericht',
  placeholder = 'Schrijf uw bericht',
  textareaName = 'content',
  fileInputName = 'file',
  accept,
  error,
  status,
  submitLabel = 'Versturen',
  uploadLabel = 'Bijlage toevoegen',
  selectedFileLabel = 'Gekozen bijlage',
  locale = 'nl-NL',
  messagesId: messagesIdProp,
  textareaProps,
  onFileChange,
  uploadIcon = <PaperclipIcon />,
  submitIcon = <SendIcon />,
  className,
  children,
  ...props
}: ChatMessageFormProps) => {
  const id = useId();
  const chatDialogContext = useChatDialogContext();
  const messagesId = messagesIdProp ?? chatDialogContext.messagesId;
  const textareaId = `${id}-content`;
  const errorId = `${id}-error`;
  const previewId = `${id}-preview`;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  // Revoke the thumbnail object URL when the file changes
  useEffect(() => {
    return () => {
      if (selectedFile?.thumbnailSrc) URL.revokeObjectURL(selectedFile.thumbnailSrc);
    };
  }, [selectedFile]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(
      file
        ? {
            name: file.name,
            type: file.name.split('.').pop()?.toLowerCase() ?? '',
            size: formatFileSize(file.size, locale),
            date: formatFileDate(file.lastModified, locale),
            // Thumbnail for images only; other files get a placeholder
            thumbnailSrc: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          }
        : null,
    );
    onFileChange?.(file);
  };

  return (
    <form className={clsx('mijn-chat-message-form', className)} {...props}>
      {/* E.g. the CSRF token */}
      {children}

      <p className="mijn-chat-message-form__error" id={errorId} role="alert">
        {error}
      </p>

      <div className="mijn-chat-message-form__field">
        <div className="mijn-chat-message-form__input">
          <label className="mijn-chat-message-form__label mijn-visually-hidden" htmlFor={textareaId}>
            {label}
          </label>
          <textarea
            className="mijn-chat-message-form__textarea"
            id={textareaId}
            name={textareaName}
            rows={2}
            placeholder={placeholder}
            aria-controls={messagesId}
            aria-describedby={errorId}
            {...textareaProps}
          />

          <div className="mijn-chat-message-form__preview" id={previewId} aria-live="polite">
            {selectedFile && (
              <ChatMessageAttachment
                className="mijn-chat-message-form__attachment"
                label={selectedFileLabel}
                fileName={selectedFile.name}
                fileType={selectedFile.type}
                fileSize={selectedFile.size}
                fileDate={selectedFile.date}
                thumbnailSrc={selectedFile.thumbnailSrc}
              />
            )}
          </div>
        </div>

        <div className="mijn-chat-message-form__actions">
          {/* Hidden file input, opened by the upload button */}
          <input
            ref={fileInputRef}
            className="mijn-chat-message-form__file"
            type="file"
            name={fileInputName}
            accept={accept}
            hidden
            onChange={handleFileChange}
          />
          <Button
            className="mijn-chat-message-form__upload"
            purpose="secondary"
            iconOnly
            iconStart={uploadIcon}
            label={uploadLabel}
            aria-describedby={selectedFile ? previewId : undefined}
            onClick={() => fileInputRef.current?.click()}
          />
          <Button
            className="mijn-chat-message-form__submit"
            type="submit"
            purpose="secondary"
            label={submitLabel}
            iconEnd={submitIcon}
            aria-controls={messagesId}
          />
        </div>
      </div>

      <p className="mijn-chat-message-form__status mijn-visually-hidden" role="status">
        {status}
      </p>
    </form>
  );
};

export default ChatMessageForm;
