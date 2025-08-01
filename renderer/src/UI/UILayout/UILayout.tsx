import styles from './UILayout.module.scss';

interface UILayoutProps {
  children: React.ReactNode;
}

export const UILayout = ({ children }: UILayoutProps) => {
  return (
    <div className={styles.UILayout}>
      {
        children
      }
    </div>
  );
}