// electron-app/preload.js
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  hello: () => 'RealOpenManager'
});
