// Desktop wrapper for Eight Bells. It opens the same index.html you get on the web,
// and allows MIDI so the app can talk to the FM-1 over USB.
const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Remember the window size, position and maximised state between launches.
const boundsFile = () => path.join(app.getPath('userData'), 'window.json');
function loadBounds() {
  try { const b = JSON.parse(fs.readFileSync(boundsFile(), 'utf8')); if (b && b.width > 300 && b.height > 300) return b; } catch (_) {}
  return null;
}
function saveBounds(win) {
  try {
    const max = win.isMaximized();
    const b = max ? (loadBounds() || {}) : win.getBounds();
    fs.writeFileSync(boundsFile(), JSON.stringify({ ...b, maximized: max }));
  } catch (_) {}
}

function createWindow() {
  const saved = loadBounds();
  const win = new BrowserWindow({
    width: saved ? saved.width : 1200,
    height: saved ? saved.height : 900,
    ...(saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? { x: saved.x, y: saved.y } : {}),
    backgroundColor: '#0e1118',
    title: 'Eight Bells',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  win.setMenuBarVisibility(false);
  if (saved && saved.maximized) win.maximize();
  win.on('close', () => saveBounds(win));
  win.loadFile(path.join(__dirname, '..', 'index.html'));
  // Links in the page open in the normal browser, not inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  const ok = (permission) => permission === 'midi' || permission === 'midiSysex';
  session.defaultSession.setPermissionRequestHandler((_wc, permission, callback) => callback(ok(permission)));
  session.defaultSession.setPermissionCheckHandler((_wc, permission) => ok(permission));
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
