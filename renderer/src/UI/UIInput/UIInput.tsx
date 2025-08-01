import React from 'react';
import styles from './UIInput.module.scss';

interface UIInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'file' | 'text';
}

export const UIInput: React.FC<UIInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  const renderInput = () => {
    if (type === 'text') {
      return (
        <input
          className={styles.UIInputField}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      );
    }
    if (type === 'file') {
      return (
        <input
          className={styles.UIInputField}
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && 'path' in file) {
              onChange((file as any).path);
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className={styles.UIInput}>
      <label className={styles.UIInputLabel}>
        {label}
        {renderInput()}
      </label>
    </div>
  );
};
