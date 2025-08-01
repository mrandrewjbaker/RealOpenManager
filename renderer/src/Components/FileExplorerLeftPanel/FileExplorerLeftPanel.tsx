import { useState, useEffect } from 'react';
import styles from './FileExplorerLeftPanel.module.scss';

export const FileExplorerLeftPanel: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [panelWidth, setPanelWidth] = useState(250); // pixels

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newWidth = Math.max(150, Math.min(600, e.clientX)); // Min 150px, Max 600px
      setPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const calculatePanelStyle = () => {
    return {
      width: `${panelWidth}px`,
    };
  };

  return (
    <div className={styles.FileExplorerLeftPanelContainer}>
      <div className={styles.FileExplorerLeftPanel} style={calculatePanelStyle()}>
        {/* File Explorer content goes here */}
      </div>
      <div 
        className={styles.FileExplorerLeftPanelHandle} 
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'col-resize' : 'col-resize' }}
      >
        <div className={styles.FileExplorerLeftPanelHandleBar} />
      </div>
    </div>
  );
};
