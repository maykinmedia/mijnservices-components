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
import { MessageAttachment } from './MessageAttachment';
import { useMessagesContext } from './Messages';

export type MessageFormProps = FormHTMLAttributes<HTMLFormElement> & {
  /** Label van het tekstveld (alleen voor screenreaders). Standaard "Schrijf uw bericht". */
  label?: string;
  /** Placeholder van het tekstveld. Standaard "Schrijf uw bericht". */
  placeholder?: string;
  /** name van de textarea. Standaard "content". */
  textareaName?: string;
  /** name van de file-input. Standaard "file". */
  fileInputName?: string;
  /** Toegestane bestandstypen, bijv. ".pdf,.png". Komt uit de backend. Zonder deze prop zijn alle bestanden toegestaan. */
  accept?: string;
  /** Foutmelding, bijv. "Bericht kon niet worden verzonden". Wordt voorgelezen (role="alert"). */
  error?: ReactNode;
  /** Verzendstatus, bijv. "Bericht wordt verzonden…". Wordt voorgelezen (role="status"). */
  status?: ReactNode;
  /** Tekst van de verzendknop. Standaard "Versturen". */
  submitLabel?: string;
  /** Tekst van de bijlageknop (alleen voor screenreaders). Standaard "Bijlage toevoegen". */
  uploadLabel?: string;
  /** Tekst voor screenreaders vóór het gekozen bestand. Standaard "Gekozen bijlage". */
  selectedFileLabel?: string;
  /** id van de berichtenlijst (role="log"), voor aria-controls. Binnen <Messages> gaat dit automatisch. */
  logId?: string;
  /** Extra attributen voor de textarea, bijv. value en onChange */
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  /** Wordt aangeroepen als de gebruiker een bestand kiest */
  onFileChange?: (file: File | null) => void;
  /**
   * Eigen icoon voor de bijlageknop, bijv. van Font Awesome of Material UI.
   * Geef het icoon aria-hidden="true", de tekst staat al in het label van de knop.
   */
  uploadIcon?: ReactNode;
  /** Eigen icoon voor de verzendknop. Ook aria-hidden="true" meegeven. */
  submitIcon?: ReactNode;
};

type SelectedFile = {
  name: string;
  type: string;
  size: string;
  date: string;
  thumbnailSrc?: string;
};

// 233472 → "228 kB", 1572864 → "1,5 MB"
const formatFileSize = (bytes: number) => {
  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) return `${Math.max(1, Math.round(kilobytes))} kB`;
  return `${(kilobytes / 1024).toFixed(1).replace('.', ',')} MB`;
};

// "14-07-2026"
const formatFileDate = (timestamp: number) =>
  new Intl.DateTimeFormat('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(timestamp);

const PaperclipIcon = () => (
  <svg className="mijnservices-message-form__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
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
  <svg className="mijnservices-message-form__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
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

export const MessageForm = ({
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
  logId: logIdProp,
  textareaProps,
  onFileChange,
  uploadIcon = <PaperclipIcon />,
  submitIcon = <SendIcon />,
  className,
  children,
  ...props
}: MessageFormProps) => {
  const id = useId();
  const messagesContext = useMessagesContext();
  const logId = logIdProp ?? messagesContext.logId;
  const textareaId = `${id}-content`;
  const errorId = `${id}-error`;
  const previewId = `${id}-preview`;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  // Tijdelijke URL van de thumbnail opruimen als er een ander bestand wordt gekozen
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
            size: formatFileSize(file.size),
            date: formatFileDate(file.lastModified),
            // Alleen van afbeeldingen een thumbnail, andere bestanden krijgen een grijs vlak
            thumbnailSrc: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          }
        : null,
    );
    onFileChange?.(file);
  };

  return (
    <form className={clsx('mijnservices-message-form', className)} {...props}>
      {/* Bijvoorbeeld het csrf-token */}
      {children}

      <p className="mijnservices-message-form__error" id={errorId} role="alert">
        {error}
      </p>

      <div className="mijnservices-message-form__field">
        <div className="mijnservices-message-form__input">
          <label
            className="mijnservices-message-form__label mijnservices-messages__visually-hidden"
            htmlFor={textareaId}
          >
            {label}
          </label>
          <textarea
            className="mijnservices-message-form__textarea"
            id={textareaId}
            name={textareaName}
            rows={2}
            placeholder={placeholder}
            aria-controls={logId}
            aria-describedby={errorId}
            {...textareaProps}
          />

          <div className="mijnservices-message-form__preview" id={previewId} aria-live="polite">
            {selectedFile && (
              <MessageAttachment
                className="mijnservices-message-form__attachment"
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

        <div className="mijnservices-message-form__actions">
          {/* De echte file-input is verborgen, de knop opent het kiesvenster */}
          <input
            ref={fileInputRef}
            className="mijnservices-message-form__file"
            type="file"
            name={fileInputName}
            accept={accept}
            hidden
            onChange={handleFileChange}
          />
          <Button
            className="mijnservices-message-form__upload"
            purpose="secondary"
            iconOnly
            iconStart={uploadIcon}
            label={uploadLabel}
            aria-describedby={selectedFile ? previewId : undefined}
            onClick={() => fileInputRef.current?.click()}
          />
          <Button
            className="mijnservices-message-form__submit"
            type="submit"
            purpose="secondary"
            label={submitLabel}
            iconEnd={submitIcon}
            aria-controls={logId}
          />
        </div>
      </div>

      <p className="mijnservices-message-form__status mijnservices-messages__visually-hidden" role="status">
        {status}
      </p>
    </form>
  );
};

export default MessageForm;
