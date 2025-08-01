import styles from './ModManagerView.module.scss';

export const ModManagerView: React.FC = () => {
  return (
    <div className={styles.ModManagerView}>
      <div className={styles.ModManagerContent}>
        <div className={styles.ModManagerHeader}>
          <h2>Mod Manager</h2>
          <p>Manage your game modifications</p>
        </div>
        
        <div className={styles.ModManagerPlaceholder}>
          <div className={styles.ModManagerSection}>
            <h3>Installed Mods</h3>
            <p>No mods installed yet</p>
          </div>
          
          <div className={styles.ModManagerSection}>
            <h3>Available Mods</h3>
            <p>Browse and install new mods</p>
          </div>
        </div>
      </div>
    </div>
  );
};
