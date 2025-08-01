import { useState } from 'react';
import { useAppStore } from '../../Store/useAppStore';

import { UIModal } from "../../UI/UIModal/UIModal";
import { UIInputFolderPicker } from '../../UI/UIInputFolderPicker/UIInputFolderPicker';
import { UIButton } from '../../UI/UIButton/UIButton';

export const WorkingLocationModal = () => {
  const { gamePath, setGamePath, dismissModal } = useAppStore();
  const [path, setPath] = useState(gamePath || '');

  const handleSave = () => {
    setGamePath(path);
    dismissModal();
  };

  return (
    <UIModal
      title="Set Game Directory"
      onClose={dismissModal}
      footer={<UIButton onClick={handleSave} disabled={path.trim().length === 0}>Save</UIButton>}
    >
      <UIInputFolderPicker
        label="Game Directory"
        value={path}
        onChange={setPath}
        placeholder="Enter the path to your game"
      />
    </UIModal>
  );
}