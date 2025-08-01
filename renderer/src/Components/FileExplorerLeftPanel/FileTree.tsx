import { useState, useEffect } from 'react';
import styles from './FileTree.module.scss';

interface FileSystemItem {
  name: string;
  isDirectory: boolean;
  path: string;
}

interface FileTreeProps {
  directoryPath: string | null;
}

interface FileTreeItemProps {
  item: FileSystemItem;
  level: number;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ item, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [children, setChildren] = useState<FileSystemItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (item.isDirectory) {
      if (!isExpanded && children.length === 0) {
        setIsLoading(true);
        try {
          const items = await window.api.readDirectory(item.path);
          setChildren(items);
        } catch (error) {
          console.error('Error reading directory:', error);
        } finally {
          setIsLoading(false);
        }
      }
      setIsExpanded(!isExpanded);
    }
  };

  const getIcon = () => {
    if (item.isDirectory) {
      return isExpanded ? '📂' : '📁';
    }
    // Basic file type icons
    const ext = item.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
        return '📄';
      case 'json':
        return '📋';
      case 'css':
      case 'scss':
        return '🎨';
      case 'md':
        return '📖';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg':
        return '🖼️';
      default:
        return '📄';
    }
  };

  return (
    <div className={styles.fileTreeItem}>
      <div 
        className={styles.fileTreeItemContent}
        style={{ paddingLeft: `${level * 12}px` }}
        onClick={handleToggle}
      >
        <span className={styles.fileTreeItemIcon}>
          {isLoading ? '⏳' : getIcon()}
        </span>
        <span className={styles.fileTreeItemName}>
          {item.name}
        </span>
      </div>
      {item.isDirectory && isExpanded && (
        <div className={styles.fileTreeItemChildren}>
          {children.map((child) => (
            <FileTreeItem 
              key={child.path} 
              item={child} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<FileTreeProps> = ({ directoryPath }) => {
  const [items, setItems] = useState<FileSystemItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDirectory = async () => {
      if (!directoryPath) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const items = await window.api.readDirectory(directoryPath);
        setItems(items);
      } catch (err) {
        setError('Failed to load directory contents');
        console.error('Error loading directory:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDirectory();
  }, [directoryPath]);

  if (!directoryPath) {
    return (
      <div className={styles.fileTreeEmpty}>
        <p>No directory selected</p>
        <p>Choose a working directory to explore files</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.fileTreeLoading}>
        <p>Loading directory contents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.fileTreeError}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.fileTree}>
      <div className={styles.fileTreeHeader}>
        <span className={styles.fileTreeHeaderIcon}>📁</span>
        <span className={styles.fileTreeHeaderText}>
          {directoryPath.split('/').pop() || directoryPath}
        </span>
      </div>
      <div className={styles.fileTreeContent}>
        {items.map((item) => (
          <FileTreeItem key={item.path} item={item} level={0} />
        ))}
      </div>
    </div>
  );
};
