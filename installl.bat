@echo off
echo Installation de Focus...

call npm install
call npm run build
call npx electron-builder --win

echo Creation du raccourci sur le bureau...
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.Environment]::GetFolderPath('Desktop') + '\Focus.lnk'); $Shortcut.TargetPath = '%cd%\release\win-unpacked\Focus.exe'; $Shortcut.IconLocation = '%cd%\public\logo_1.png'; $Shortcut.Save()"

echo.
echo Focus installe !
echo Lance l'app depuis le raccourci sur ton bureau.
pause