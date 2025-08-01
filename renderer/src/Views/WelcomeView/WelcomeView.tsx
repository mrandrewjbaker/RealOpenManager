import styles from './WelcomeView.module.scss';

export const WelcomeView: React.FC = () => {
  return (
    <div className={styles.WelcomeView}>
      <div className={styles.WelcomeContent}>
        <h2>Welcome to RealOpenManager</h2>
        <p>Please select your game directory to get started.</p>
        <div className={styles.WelcomeInstructions}>
          <p>Once you've selected your game directory, you can:</p>
          <ul>
            <li>Browse and manage game files with the File Explorer</li>
            <li>Install and manage mods with the Mod Manager</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
