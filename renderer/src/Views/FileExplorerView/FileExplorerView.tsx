import { FileExplorerLeftPanel } from '../../Components/FileExplorerLeftPanel/FileExplorerLeftPanel';
import styles from './FileExplorerView.module.scss';

export const FileExplorerView: React.FC = () => {
  return (
    <div className={styles.FileExplorerView}>
      <FileExplorerLeftPanel />
      <div className={styles.FileExplorerContent}>
        <div className={styles.FileExplorerPlaceholder}>
          <h2>File Explorer</h2>
          <p>Select a file or folder to view its contents</p>
        </div>
      </div>
    </div>
  );
};
