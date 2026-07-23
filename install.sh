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

cat > "$BUREAU/Focus.desktop" << EOF
[Desktop Entry]
Name=Focus
Exec=$(pwd)/release/linux-unpacked/focus --no-sandbox
Icon=$(pwd)/public/logo_1.png
Type=Application
Terminal=false
Categories=Utility;
EOF

chmod +x "$BUREAU/Focus.desktop"

echo "Focus installé ! Lance l'app depuis ton bureau."