#!/bin/bash

echo "Iniciando instalación automática de MaycolAI..."

# Actualiza sistema
sudo apt update -y && sudo apt upgrade -y

# Instala dependencias
sudo apt install -y git nodejs npm ffmpeg python3-pip
sudo npm install -g yarn

# Instala yt-dlp
pip3 install yt-dlp

# Instala e inicia el bot
npm install
npm install gemini-chatbot
rm -rf baileys
npm start
