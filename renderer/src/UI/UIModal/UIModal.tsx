import styles from './UIModal.module.scss';

interface UIModalProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closable?: boolean;
  onClose: () => void;
}

export const UIModal: React.FC<UIModalProps> = ({ title, children, footer, closable, onClose }) => {
  
  return (
    <div className={styles.UIModalContainer}>
      <div className={styles.UIModal}>
        <div className={styles.UIModalHeader}>
          <div className={styles.UIModalHeaderTitle}>{title}</div>
          {
            closable && (
              <button className={styles.UIModalHeaderCloseButton} onClick={onClose}>
                &times;
              </button>
            )
          }
        </div>
        <div className={styles.UIModalBody}>
          {children}
        </div>
        {footer && <div className={styles.UIModalFooter}>{footer}</div>}
      </div>
    </div>
  );
}