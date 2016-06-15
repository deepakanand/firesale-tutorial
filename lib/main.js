const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;
const fs = require('fs');

var mainWindow = null;

app.on('ready', function() {
	console.log('app is ready!');

	mainWindow = new BrowserWindow();
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	// mainWindow.webContents.openDevTools();
	openFile();

	mainWindow.on('close', function() {
		mainWindow = null;
	});
});

const openFile = function() {
	var files = dialog.showOpenDialog(mainWindow, {
		properties: ['openFile'],
		filters: [{
			name: 'Markdown Files',
			extensions: ['md', 'markdown', 'txt']
		}]
	});

	if (!files) {
		return;
	}

	var file = files[0];
	var content = fs.readFileSync(file).toString();


	// important gotcha not in tutorial - did-finish-load
	mainWindow.webContents.on('did-finish-load', function() {
		mainWindow.webContents.send('file-opened', file, content);
	});
};