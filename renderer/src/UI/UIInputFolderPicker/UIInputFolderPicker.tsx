import React from 'react';
import styles from './UIInputFolderPicker.module.scss';

declare global {
  interface Window {
    api: {
      selectFolder: () => Promise<string>;
      checkFileExists: (dirPath: string, fileName: string) => Promise<boolean>;
    };
  }
}

interface UIInputFolderPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const UIInputFolderPicker: React.FC<UIInputFolderPickerProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.UIInput}>
      <label className={styles.UIInputLabel}>
        {label}
        <div className={styles.UIInputFolderPicker}>
          <input
            className={styles.UIInputField}
            type="text"
            value={value}
            readOnly
            placeholder={placeholder || 'Select folder'}
          />
          <button
            type="button"
            className={styles.UIInputButton}
            onClick={async () => {
              const dir = await window.api.selectFolder();
              if (dir) onChange(dir);
            }}
          >
            Browse...
          </button>
        </div>
      </label>
    </div>
  );
};
