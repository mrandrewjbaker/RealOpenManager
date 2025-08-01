import { Routes, Route } from "react-router"
import { FileExplorerView, ModManagerView, WelcomeView } from '../../Views';
import { useAppStore } from '../../Store/useAppStore';

import styles from './AppRouter.module.scss';

export const AppRouter: React.FC = () => {
  const showWorkingLocationModal = useAppStore((s) => s.showGamePathModal);

  // Always show welcome view when modal is open, regardless of route
  if (showWorkingLocationModal) {
    return (
      <div className={styles.AppRouter}>
        <WelcomeView />
      </div>
    );
  }

  return (
    <div className={styles.AppRouter}>
      <Routes>
        <Route path="/" element={<WelcomeView />}/>
        <Route path="/file-explorer" element={<FileExplorerView />} />
        <Route path="/mod-manager" element={<ModManagerView />} />
      </Routes>
    </div>
  );
}