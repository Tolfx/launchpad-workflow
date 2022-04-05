import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import "./server/index";

const isProd: boolean = process.env.NODE_ENV === 'production';
const port = process.argv[2];


if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 1000,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

})();

app.on('window-all-closed', () => {
  app.quit();
});
