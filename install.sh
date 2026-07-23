#!/bin/bash

echo "📦 Installation de Focus..."

# Installe les dépendances
npm install

# Build l'app
npm run build
npx electron-builder --linux

# Rend l'exécutable accessible
chmod +x $(pwd)/release/linux-unpacked/focus

# Crée un raccourci sur le bureau
BUREAU="$HOME/Bureau"
if [ ! -d "$BUREAU" ]; then
    BUREAU="$HOME/Desktop"
fi

cat > "$BUREAU/Focus.desktop" << DESKTOP
[Desktop Entry]
Name=Focus
Exec=$(pwd)/release/linux-unpacked/focus --no-sandbox
Icon=$(pwd)/public/logo_1.png
Type=Application
Terminal=false
Categories=Utility;
DESKTOP

chmod +x "$BUREAU/Focus.desktop"

# Installe dans le menu des applications pour pouvoir épingler dans la barre
mkdir -p ~/.local/share/applications
cp "$BUREAU/Focus.desktop" ~/.local/share/applications/Focus.desktop

echo "✅ Focus installé !"

