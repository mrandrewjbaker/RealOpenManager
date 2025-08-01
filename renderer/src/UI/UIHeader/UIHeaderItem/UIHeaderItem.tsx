import { useLocation } from 'react-router';
import styles from './UIHeaderItem.module.scss';

interface UIHeaderItemProps {
  text: string;
}

export const UIHeaderItem: React.FC<UIHeaderItemProps> = ({ text }) => {
  const location = useLocation();

  const isActive = location.pathname === `/${text.toLowerCase()}`;

  return (
    <div className={`${styles.UIHeaderItem} ${isActive ? styles.active : ''}`}>
      {text}
    </div>
  );
}
