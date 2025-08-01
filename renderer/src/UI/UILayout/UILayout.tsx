import styles from './UILayout.module.scss';

interface UILayoutProps {
  children: React.ReactNode;
}

export const UILayout = ({ children }: UILayoutProps) => {
  return (
    <div className={styles.UILayout}>
      <div className={styles.UILayoutHeader}>
        <div className={styles.UILayoutHeaderNavBar}>
        </div>
      </div>
      <div className={styles.UILayoutBody}>
        <div className={styles.UILayoutBodyMainContent}>
          {
            children
          }
        </div>
      </div>
    </div>
  );
}