/// <reference types="vite/client" />

interface FileSystemItem {
  name: string;
  isDirectory: boolean;
  path: string;
}

interface Window {
  api: {
    hello: () => string;
    selectFolder: () => Promise<string>;
    checkFileExists: (dirPath: string, fileName: string) => Promise<boolean>;
    readDirectory: (dirPath: string) => Promise<FileSystemItem[]>;
  };
}