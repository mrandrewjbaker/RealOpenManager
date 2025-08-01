import styles from './UIHeader.module.scss';

interface UIHeaderProps {
  children?: React.ReactNode;
}

export const UIHeader: React.FC<UIHeaderProps> = ({ children }) => {
  return (
    <div className={styles.UIHeader}>
      <div className={styles.UIHeaderNavBar}>
        {children}
      </div>
    </div>
  );
}