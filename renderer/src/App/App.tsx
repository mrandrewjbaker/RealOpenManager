import { BrowserRouter } from 'react-router'
import { UILayout } from '../UI/UILayout/UILayout'

import { WorkingLocationModal } from '../Components/WorkingLocationModal/WorkingLocationModal';

import { useAppStore } from '../Store/useAppStore';

import styles from './App.module.scss'


export const App = () => {
  const showModal = useAppStore((s) => s.showGamePathModal);

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <UILayout>
          <div>
            {/* Your content goes here */}
          </div>
        </UILayout>

        {showModal && (
          <WorkingLocationModal />
        )}

      </div>
    </BrowserRouter>
  )
}
