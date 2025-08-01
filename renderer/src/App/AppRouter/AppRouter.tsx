import { Routes } from "react-router"

import styles from './AppRouter.module.scss';

export const AppRouter: React.FC = () => {
  return (
    <div className={styles.AppRouter}>
      <Routes>
        {/* Define your routes here */}
        {/* Example: <Route path="/" element={<Home />} /> */}
      </Routes>
    </div>
  );
}