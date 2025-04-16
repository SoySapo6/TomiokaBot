#!/data/data/com.termux/files/usr/bin/bash

clear

# Función para imprimir texto ASCII con estilo
function print_ascii() {
    echo -e "\e[1;36m"
    figlet -f slant "$1"
    echo -e "\e[0m"
}

# Emojis de Hanako-kun
EMOJI="️✨️☁️️"

print_ascii "MaycolAI Installer"
echo "Hecho Por SoyMaycol"
sleep 2

# Actualización
print_ascii "Actualizando"
pkg update -y && pkg upgrade -y

# Instalación de herramientas esenciales
print_ascii "Instalando Dependencias"
pkg install git -y
pkg install nodejs-lts -y
pkg install ffmpeg -y
pkg install python-pip -y
npm install -g yarn
pip install yt-dlp

# Clonando repositorio
print_ascii "Clonando Repositorio"
git clone https://github.com/SoySapo6/MaycolAI

cd MaycolAI

# Instalando módulos del proyecto
print_ascii "Instalando Modulos"
npm install
npm install gemini-chatbot

# Eliminando baileys si existe
print_ascii "Limpiando"
rm -rf baileys

# Mensaje final
clear
print_ascii "Instalacion Completa"
echo -e "\e[1;35mGracias por elegirme <3 \e[0m"
echo -e "\e[1;32mIniciando MaycolAI...\e[0m"
sleep 2

# Iniciando el bot
npm start
