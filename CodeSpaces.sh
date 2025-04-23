#!/bin/bash

clear

# Colores
Cyan="\e[1;36m"
Purple="\e[1;35m"
Green="\e[1;32m"
Red="\e[1;31m"
Yellow="\e[1;33m"
Reset="\e[0m"

# Función para imprimir texto ASCII con estilo
function print_ascii() {
    echo -e "$Cyan"
    figlet -f slant "$1"
    echo -e "$Reset"
}

# Presentación mágica
CHARACTER_1="Hanako-kun $Yellow✨"
CHARACTER_2="Nene Yashiro $Purple♡"
CHARACTER_3="Kou Minamoto $Green⚔️"

echo -e "$Yellow$CHARACTER_1 aparece flotando sobre el script..."
echo -e "$Purple$CHARACTER_2: ¡Hora de instalar algo genial!"
echo -e "$Green$CHARACTER_3: ¡Vamos, que esto será rápido y fácil!$Reset"
sleep 2

print_ascii "MaycolAI"
echo -e "$PurpleAjusta la Escala del Terminal para una mejor experiencia...$Reset"
echo -e "$GreenHecho con amor por SoyMaycol$Reset"
echo -e "$Yellow$CHARACTER_1: Reproduciendo música (simulada)...$Reset"
sleep 2

# Actualización
print_ascii "Actualizando"
echo -e "$Yellow$CHARACTER_1: ¡Vamos a asegurarnos que todo esté al día!$Reset"
sudo apt update -y && sudo apt upgrade -y

# Instalación de herramientas esenciales
print_ascii "Instalando"
echo -e "$Purple$CHARACTER_2: Instalando herramientas esenciales...$Reset"
sudo apt install -y git curl nodejs npm ffmpeg python3-pip jp2a figlet

# Módulos globales
npm install -g yarn
pip install yt-dlp

# Suponiendo que ya estás dentro del repo
curl -s -o Hanako.jpg https://files.catbox.moe/ncr2te.jpg

# Instalando módulos del proyecto
print_ascii "Dependencias"
echo -e "$Yellow$CHARACTER_1: Invocando todos los módulos necesarios...$Reset"
npm install
npm install gemini-chatbot
npm install moment

# Eliminando sesiones antiguas
print_ascii "Limpieza"
echo -e "$Red$CHARACTER_3: Eliminando sesiones pasadas para evitar errores...$Reset"
rm -rf baileys

# Mensaje final
clear
print_ascii "SoyMaycol"
jp2a --color Hanako.jpg
echo -e "$Purple Gracias por usar MaycolAI, eres lo máximo <3$Reset"
echo -e "$Green Para iniciar el bot, ejecuta manualmente:$Reset"
echo -e "$Cyan"
echo "npm start"
echo -e "$Reset"
read -p "Presiona Enter para salir..."
