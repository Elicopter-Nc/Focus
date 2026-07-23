#!/bin/bash

echo "📦 Installation de Focus..."

# Installe les dépendances
npm install

# Build l'app
npm run electron:build -- --no-sandbox

# Crée un raccourci sur le bureau
cat > ~/Bureau/Focus.desktop << EOF
[Desktop Entry]
Name=Focus
Exec=$(pwd)/release/linux-unpacked/focus
Icon=$(pwd)/public/logo_1.png
Type=Application
Categories=Utility;
EOF

chmod +x ~/Bureau/Focus.desktop

echo "Focus installé ! Lance l'app depuis ton bureau."