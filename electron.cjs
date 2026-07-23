const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'public/logo_1.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
    },
        titleBarStyle: 'hiddenInset',
        title: 'Focus'
    })

    // En dev → charge le serveur Vite
    // En prod → charge les fichiers buildés
    if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173')
    win.on('page-title-updated', (e) => {
        e.preventDefault()
    })
    } else {
        win.loadFile(path.join(__dirname, 'dist/index.html'))
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})