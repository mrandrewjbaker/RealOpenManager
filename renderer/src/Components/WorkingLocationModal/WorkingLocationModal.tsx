import { useState, useEffect } from 'react';
import { useAppStore } from '../../Store/useAppStore';

import { UIModal } from "../../UI/UIModal/UIModal";
import { UIInputFolderPicker } from '../../UI/UIInputFolderPicker/UIInputFolderPicker';
import { UIButton } from '../../UI/UIButton/UIButton';

export const WorkingLocationModal = () => {
  const { gamePath, setGamePath, dismissModal } = useAppStore();
  const [path, setPath] = useState(gamePath || '');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateDirectory = async (directoryPath: string) => {
    if (!directoryPath.trim()) {
      setValidationMessage('');
      setIsValid(false);
      return;
    }

    setIsValidating(true);
    try {
      const hasRageFile = await window.api.checkFileExists(directoryPath, 'RAGE.test');
      if (hasRageFile) {
        setValidationMessage('Valid directory selected');
        setIsValid(true);
      } else {
        setValidationMessage('Invalid directory selected');
        setIsValid(false);
      }
    } catch (error) {
      setValidationMessage('Error validating directory');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    validateDirectory(path);
  }, [path]);

  const handlePathChange = (newPath: string) => {
    setPath(newPath);
  };

  const handleSave = () => {
    setGamePath(path);
    dismissModal();
  };

  return (
    <UIModal
      title="Set Game Directory"
      onClose={dismissModal}
      footer={<UIButton onClick={handleSave} disabled={!isValid || isValidating}>Save</UIButton>}
    >
      <div>
        <UIInputFolderPicker
          label="Game Directory"
          value={path}
          onChange={handlePathChange}
          placeholder="Enter the path to your game"
        />
        {(validationMessage || isValidating) && (
          <div style={{ 
            marginTop: '12px',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: isValid ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
            color: isValid ? '#28a745' : '#dc3545',
            border: `1px solid ${isValid ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
            marginBottom: '8px'
          }}>
            {isValidating ? 'Validating directory...' : validationMessage}
          </div>
        )}
      </div>
    </UIModal>
  );
}