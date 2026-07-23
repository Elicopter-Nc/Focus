@echo off
echo Installation de Focus...

call npm install
call npm run electron:build

echo Création du raccourci...
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut([System.Environment]::GetFolderPath('Desktop') + '\Focus.lnk'); $Shortcut.TargetPath = '%cd%\release\win-unpacked\Focus.exe'; $Shortcut.Save()"

echo Focus installe ! Lance l'app depuis ton bureau.
pause