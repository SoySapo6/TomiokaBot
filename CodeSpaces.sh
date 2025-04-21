#!/bin/bash

clear

# Colores
Cyan="\e[1;36m"
Purple="\e[1;35m"
Green="\e[1;32m"
Red="\e[1;31m"
Yellow="\e[1;33m"
Reset="\e[0m"

function print_ascii() {
    echo -e "$Cyan"
    figlet -f slant "$1"
    echo -e "$Reset"
}

# Verificar si figlet está instalado
if ! command -v figlet &> /dev/null; then
    echo -e "$Red[Hanako-kun]: figlet no está instalado, instalando...$Reset"
    sudo apt update && sudo apt install figlet -y
fi

# Presentación mágica
CHARACTER_1="Hanako-kun ✨"
CHARACTER_2="Nene Yashiro ♡"
CHARACTER_3="Kou Minamoto ⚔️"

echo -e "$Yellow$CHARACTER_1 aparece flotando sobre el script..."
echo -e "$Purple$CHARACTER_2: ¡Hora de instalar algo genial!"
echo -e "$Green$CHARACTER_3: ¡Vamos, que esto será rápido y fácil!$Reset"
sleep 2

print_ascii "MaycolAI"
echo -e "$Purple Ajusta la Terminal para una mejor experiencia...$Reset"
echo -e "$Green Hecho con amor por SoyMaycol$Reset"
sleep 2

# Actualización
print_ascii "Actualizando"
sudo apt update -y && sudo apt upgrade -y

# Instalación de herramientas
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
sudo apt install -y git nodejs npm ffmpeg python3-pip

# Configurar NodeJS si es necesario
sudo npm install -g yarn
pip3 install yt-dlp

# Clonar repo
print_ascii "Clonando Repo"
echo -e "$Green$CHARACTER_3: Descargando MaycolAI desde los cielos digitales...$Reset"
git clone https://github.com/SoySapo6/MaycolAI
cd MaycolAI
curl -s -o Hanako.png https://files.catbox.moe/aml84a.png

# Instalar dependencias del bot
print_ascii "Dependencias"
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
npm install
npm install gemini-chatbot

# Limpiar sesiones antiguas
print_ascii "Limpieza"
echo -e "$Red$CHARACTER_3: Eliminando sesiones pasadas para evitar errores...$Reset"
rm -rf baileys

# Mensaje final
clear
print_ascii "SoyMaycol"
echo -e "$Purple Gracias por usar MaycolAI, eres lo máximo <3$Reset"
echo -e "$Green Para iniciar el bot, ejecuta el siguiente comando:$Reset"
echo -e "$Cyan"
echo "cd MaycolAI && npm start"
echo -e "$Reset"
read -p "Presiona Enter para salir..."
