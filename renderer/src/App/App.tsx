import { BrowserRouter } from 'react-router'
import { UILayout } from '../UI/UILayout/UILayout'

import { WorkingLocationModal } from '../Components/WorkingLocationModal/WorkingLocationModal';

import { useAppStore } from '../Store/useAppStore';

import styles from './App.module.scss'
import { FileExplorerLeftPanel } from '../Components/FileExplorerLeftPanel/FileExplorerLeftPanel';


export const App = () => {
  const showWorkingLocationModal = useAppStore((s) => s.showGamePathModal);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <UILayout>
          <div className={styles.AppContent}>
            {
              !showWorkingLocationModal && (
                <FileExplorerLeftPanel />
              )
            }
          </div>
        </UILayout>

        {showWorkingLocationModal && (
          <WorkingLocationModal />
        )}

      </div>
    </BrowserRouter>
  )
}
