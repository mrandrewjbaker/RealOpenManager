import { BrowserRouter } from 'react-router'
import { UILayout } from '../UI/UILayout/UILayout'

import { WorkingLocationModal } from '../Components/WorkingLocationModal/WorkingLocationModal';

import { useAppStore } from '../Store/useAppStore';

import { UIHeader } from '../UI/UIHeader/UIHeader';
import { UIHeaderItem } from '../UI/UIHeader/UIHeaderItem/UIHeaderItem';
import { AppRouter } from './AppRouter/AppRouter';

import styles from './App.module.scss'



export const App = () => {
  const showWorkingLocationModal = useAppStore((s) => s.showGamePathModal);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <UILayout>
          <UIHeader>
            <UIHeaderItem text="File Explorer" />
            <UIHeaderItem text="Mod Manager" />
          </UIHeader>
          <div className={styles.AppContent}>
            <AppRouter />
          </div>
        </UILayout>

        {showWorkingLocationModal && (
          <WorkingLocationModal />
        )}

      </div>
    </BrowserRouter>
  )
}
