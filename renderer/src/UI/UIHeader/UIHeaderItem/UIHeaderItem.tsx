import { useLocation, useNavigate } from 'react-router';
import { useAppStore } from '../../../Store/useAppStore';
import styles from './UIHeaderItem.module.scss';

interface UIHeaderItemProps {
  text: string;
  to?: string;
}

export const UIHeaderItem: React.FC<UIHeaderItemProps> = ({ text, to }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showWorkingLocationModal = useAppStore((s) => s.showGamePathModal);

  // Default routing based on text if no 'to' prop provided
  const routePath = to || (text === 'File Explorer' ? '/file-explorer' : '/mod-manager');
  
  // Only show as active when we're exactly on that route (not on root)
  const isActive = location.pathname === routePath;

  const handleClick = () => {
    // Don't navigate if the working location modal is open
    if (showWorkingLocationModal) {
      return;
    }
    navigate(routePath);
  };

  return (
    <div 
      className={`${styles.UIHeaderItem} ${isActive ? styles.active : ''} ${showWorkingLocationModal ? styles.disabled : ''}`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
}
